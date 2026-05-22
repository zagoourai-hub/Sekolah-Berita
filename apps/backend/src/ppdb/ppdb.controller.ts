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
  CreatePpdbDto,
  UpdatePpdbDto,
  createPpdbSchema,
  updatePpdbSchema,
} from './dto/ppdb.dto.js';
import { PpdbService } from './ppdb.service.js';

@Controller('ppdb')
@ApiTags('PPDB')
export class PpdbController {
  constructor(private readonly ppdbService: PpdbService) {}

  @Get()
  findAll() {
    return this.ppdbService.findAll();
  }

  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: CreatePpdbDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  create(@Body(new ZodValidationPipe(createPpdbSchema)) body: CreatePpdbDto) {
    return this.ppdbService.create(body);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', example: 'ppdb_id' })
  @ApiBody({ type: UpdatePpdbDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updatePpdbSchema)) body: UpdatePpdbDto,
  ) {
    return this.ppdbService.update(id, body);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', example: 'ppdb_id' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.ppdbService.remove(id);
  }
}
