import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { z } from 'zod';
import {
  optionalDateSchema,
  publishStatusSchema,
  slugField,
} from '../../common/schemas/content.schemas.js';

export const createAgendaSchema = z.object({
  title: z.string().min(3),
  slug: slugField,
  description: z.string().optional(),
  location: z.string().optional(),
  startDate: z.coerce.date(),
  endDate: optionalDateSchema,
  status: publishStatusSchema.default('PUBLISHED'),
});

export const updateAgendaSchema = createAgendaSchema.partial();

export class CreateAgendaDto {
  @ApiProperty({ example: 'Workshop Cyber Security' })
  title!: string;

  @ApiPropertyOptional({ example: 'workshop-cyber-security' })
  slug?: string;

  @ApiPropertyOptional({ example: 'Kegiatan workshop untuk siswa.' })
  description?: string;

  @ApiPropertyOptional({ example: 'Aula Sekolah' })
  location?: string;

  @ApiProperty({
    format: 'date-time',
    example: '2026-05-24T08:00:00.000Z',
  })
  startDate!: Date;

  @ApiPropertyOptional({
    format: 'date-time',
    example: '2026-05-24T11:00:00.000Z',
  })
  endDate?: Date;

  @ApiProperty({
    enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
    example: 'PUBLISHED',
    required: false,
  })
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}

export class UpdateAgendaDto extends PartialType(CreateAgendaDto) {}
