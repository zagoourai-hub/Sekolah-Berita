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
import { AgendasService } from './agendas.service.js';
import {
  CreateAgendaDto,
  UpdateAgendaDto,
  createAgendaSchema,
  updateAgendaSchema,
} from './dto/agenda.dto.js';

@Controller('agendas')
@ApiTags('Agendas')
export class AgendasController {
  constructor(private readonly agendasService: AgendasService) {}

  @Get()
  findAll() {
    return this.agendasService.findAll();
  }

  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: CreateAgendaDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  create(
    @Body(new ZodValidationPipe(createAgendaSchema)) body: CreateAgendaDto,
  ) {
    return this.agendasService.create(body);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', example: 'agenda_id' })
  @ApiBody({ type: UpdateAgendaDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateAgendaSchema)) body: UpdateAgendaDto,
  ) {
    return this.agendasService.update(id, body);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', example: 'agenda_id' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.agendasService.remove(id);
  }
}
