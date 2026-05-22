import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe.js';
import {
  CreateGalleryDto,
  UpdateGalleryDto,
  createGallerySchema,
  updateGallerySchema,
} from './dto/gallery.dto.js';
import { GalleriesService } from './galleries.service.js';

@Controller('galleries')
@ApiTags('Galleries')
export class GalleriesController {
  constructor(private readonly galleriesService: GalleriesService) {}

  @Get()
  findAll() {
    return this.galleriesService.findAll();
  }

  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: CreateGalleryDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  create(
    @Body(new ZodValidationPipe(createGallerySchema)) body: CreateGalleryDto,
  ) {
    return this.galleriesService.create(body);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', example: 'gallery_id' })
  @ApiBody({ type: UpdateGalleryDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateGallerySchema)) body: UpdateGalleryDto,
  ) {
    return this.galleriesService.update(id, body);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', example: 'gallery_id' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.galleriesService.remove(id);
  }
}
