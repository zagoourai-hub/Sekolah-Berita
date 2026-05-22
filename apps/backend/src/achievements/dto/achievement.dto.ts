import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { z } from 'zod';
import {
  optionalDateSchema,
  publishStatusSchema,
  slugField,
} from '../../common/schemas/content.schemas.js';

export const createAchievementSchema = z.object({
  title: z.string().min(3),
  slug: slugField,
  description: z.string().optional(),
  image: z.string().optional(),
  level: z.string().optional(),
  winner: z.string().optional(),
  date: optionalDateSchema,
  status: publishStatusSchema.default('PUBLISHED'),
});

export const updateAchievementSchema = createAchievementSchema.partial();

export class CreateAchievementDto {
  @ApiProperty({ example: 'Juara 1 Lomba Web Design' })
  title!: string;

  @ApiPropertyOptional({ example: 'juara-1-lomba-web-design' })
  slug?: string;

  @ApiPropertyOptional({ example: 'Prestasi tingkat kota.' })
  description?: string;

  @ApiPropertyOptional({ example: '/uploads/prestasi.jpg' })
  image?: string;

  @ApiPropertyOptional({ example: 'Kota' })
  level?: string;

  @ApiPropertyOptional({ example: 'Tim Web Developer' })
  winner?: string;

  @ApiPropertyOptional({
    format: 'date-time',
    example: '2026-05-19T08:00:00.000Z',
  })
  date?: Date;

  @ApiProperty({
    enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
    example: 'PUBLISHED',
    required: false,
  })
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}

export class UpdateAchievementDto extends PartialType(CreateAchievementDto) {}
