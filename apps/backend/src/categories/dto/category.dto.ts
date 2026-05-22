import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { z } from 'zod';
import { slugField } from '../../common/schemas/content.schemas.js';

export const createCategorySchema = z.object({
  name: z.string().min(2),
  slug: slugField,
  description: z.string().optional(),
  color: z.string().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();

export class CreateCategoryDto {
  @ApiProperty({ example: 'Prestasi' })
  name!: string;

  @ApiPropertyOptional({ example: 'prestasi' })
  slug?: string;

  @ApiPropertyOptional({ example: 'Berita prestasi sekolah' })
  description?: string;

  @ApiPropertyOptional({ example: '#f5b936' })
  color?: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
