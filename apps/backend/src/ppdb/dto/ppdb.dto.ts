import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { z } from 'zod';
import {
  optionalDateSchema,
  publishStatusSchema,
} from '../../common/schemas/content.schemas.js';

export const createPpdbSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  banner: z.string().optional(),
  startDate: optionalDateSchema,
  endDate: optionalDateSchema,
  status: publishStatusSchema.default('DRAFT'),
});

export const updatePpdbSchema = createPpdbSchema.partial();

export class CreatePpdbDto {
  @ApiProperty({ example: 'PPDB Online 2026' })
  title!: string;

  @ApiProperty({ example: 'Informasi pendaftaran peserta didik baru.' })
  content!: string;

  @ApiPropertyOptional({ example: '/uploads/ppdb-banner.jpg' })
  banner?: string;

  @ApiPropertyOptional({
    format: 'date-time',
    example: '2026-05-19T08:00:00.000Z',
  })
  startDate?: Date;

  @ApiPropertyOptional({
    format: 'date-time',
    example: '2026-07-19T08:00:00.000Z',
  })
  endDate?: Date;

  @ApiProperty({
    enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
    example: 'PUBLISHED',
    required: false,
  })
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}

export class UpdatePpdbDto extends PartialType(CreatePpdbDto) {}
