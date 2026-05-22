import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { z } from 'zod';
import {
  optionalDateSchema,
  publishStatusSchema,
  slugField,
} from '../../common/schemas/content.schemas.js';

export const createAnnouncementSchema = z.object({
  title: z.string().min(3),
  slug: slugField,
  content: z.string().min(5),
  attachment: z.string().optional(),
  status: publishStatusSchema.default('DRAFT'),
  isImportant: z.boolean().default(false),
  publishedAt: optionalDateSchema,
});

export const updateAnnouncementSchema = createAnnouncementSchema.partial();

export class CreateAnnouncementDto {
  @ApiProperty({ example: 'Pendaftaran PPDB Gelombang 1 Dibuka' })
  title!: string;

  @ApiPropertyOptional({ example: 'pendaftaran-ppdb-gelombang-1-dibuka' })
  slug?: string;

  @ApiProperty({ example: 'Informasi resmi sekolah.' })
  content!: string;

  @ApiPropertyOptional({ example: '/uploads/pengumuman.pdf' })
  attachment?: string;

  @ApiProperty({
    enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
    example: 'PUBLISHED',
    required: false,
  })
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

  @ApiPropertyOptional({ example: true })
  isImportant?: boolean;

  @ApiPropertyOptional({
    format: 'date-time',
    example: '2026-05-19T08:00:00.000Z',
  })
  publishedAt?: Date;
}

export class UpdateAnnouncementDto extends PartialType(CreateAnnouncementDto) {}
