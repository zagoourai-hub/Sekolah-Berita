import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomUUID } from 'crypto';
import { existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';

import { OrganisasiService } from './organisasi.service.js';
import {
  CreateOrganisasiDto,
  createOrganisasiSchema,
  UpdateOrganisasiDto,
  updateOrganisasiSchema,
} from './dto/create-organisasi.dto.js';

import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe.js';

const organisasiPhotoStorage = diskStorage({
  destination: (_req, _file, callback) => {
    const uploadPath = join(process.cwd(), 'uploads', 'organisasi');

    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }

    callback(null, uploadPath);
  },

  filename: (_req, file, callback) => {
    const fileExtension = extname(file.originalname);
    const fileName = `${Date.now()}-${randomUUID()}${fileExtension}`;

    callback(null, fileName);
  },
});

const organisasiPhotoUpload = FileInterceptor('photo', {
  storage: organisasiPhotoStorage,

  fileFilter: (_req, file, callback) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.mimetype)) {
      return callback(
        new Error('File harus berupa JPG, PNG, atau WEBP.'),
        false,
      );
    }

    callback(null, true);
  },

  limits: {
    fileSize: 2 * 1024 * 1024, // maksimal 2MB
  },
});

@ApiTags('Organisasi')
@Controller('organisasi')
export class OrganisasiController {
  constructor(private readonly organisasiService: OrganisasiService) {}

  @Get()
  @ApiOperation({ summary: 'Ambil data organisasi aktif untuk public' })
  findPublic() {
    return this.organisasiService.findPublic();
  }

  /**
   * Admin endpoint.
   * Menampilkan semua data, termasuk yang nonaktif.
   */
  @Get('admin')
  @ApiOperation({ summary: 'Ambil semua data organisasi untuk admin' })
  findAll() {
    return this.organisasiService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ambil detail data organisasi berdasarkan ID' })
  findOne(@Param('id') id: string) {
    return this.organisasiService.findOne(id);
  }

  /**
   * Tambah data organisasi + optional upload foto.
   */
  @Post()
  @UseInterceptors(organisasiPhotoUpload)
  @ApiOperation({ summary: 'Tambah data organisasi' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateOrganisasiDto,
  })
  create(
    @Body(new ZodValidationPipe(createOrganisasiSchema))
    dto: CreateOrganisasiDto,

    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    const photoUrl = file ? `/uploads/organisasi/${file.filename}` : undefined;

    return this.organisasiService.create(dto, photoUrl);
  }

  /**
   * Update data organisasi + optional ganti foto.
   */
  @Patch(':id')
  @UseInterceptors(organisasiPhotoUpload)
  @ApiOperation({ summary: 'Update data organisasi' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdateOrganisasiDto,
  })
  update(
    @Param('id') id: string,

    @Body(new ZodValidationPipe(updateOrganisasiSchema))
    dto: UpdateOrganisasiDto,

    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    const photoUrl = file ? `/uploads/organisasi/${file.filename}` : undefined;

    return this.organisasiService.update(id, dto, photoUrl);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Hapus data organisasi' })
  remove(@Param('id') id: string) {
    return this.organisasiService.remove(id);
  }
}
