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
import { AnnouncementsService } from './announcements.service.js';
import {
  CreateAnnouncementDto,
  UpdateAnnouncementDto,
  createAnnouncementSchema,
  updateAnnouncementSchema,
} from './dto/announcement.dto.js';

@Controller('announcements')
@ApiTags('Announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Get()
  findAll() {
    return this.announcementsService.findAll();
  }

  @Get('important')
  important() {
    return this.announcementsService.important();
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: 'announcement_id' })
  findOne(@Param('id') id: string) {
    return this.announcementsService.findOne(id);
  }

  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: CreateAnnouncementDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  create(
    @Body(new ZodValidationPipe(createAnnouncementSchema))
    body: CreateAnnouncementDto,
  ) {
    return this.announcementsService.create(body);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', example: 'announcement_id' })
  @ApiBody({ type: UpdateAnnouncementDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateAnnouncementSchema))
    body: UpdateAnnouncementDto,
  ) {
    return this.announcementsService.update(id, body);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', example: 'announcement_id' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.announcementsService.remove(id);
  }
}
