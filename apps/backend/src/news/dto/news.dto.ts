import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { z } from 'zod';
import {
  optionalDateSchema,
  publishStatusSchema,
  slugField,
} from '../../common/schemas/content.schemas.js';

export const createNewsSchema = z.object({
  title: z.string().min(3),
  slug: slugField,
  excerpt: z.string().optional(),
  content: z.string().min(10),
  thumbnail: z.string().optional(),
  status: publishStatusSchema.default('DRAFT'),
  isBreaking: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  publishedAt: optionalDateSchema,
  authorId: z.string().min(1),
  categoryId: z.string().min(1),
});

export const updateNewsSchema = createNewsSchema.partial();

export class CreateNewsDto {
  @ApiProperty({ example: 'Siswa Raih Juara 1 Lomba Web Design' })
  title!: string;

  @ApiPropertyOptional({ example: 'siswa-raih-juara-1-lomba-web-design' })
  slug?: string;

  @ApiPropertyOptional({
    example: 'Prestasi membanggakan diraih siswa sekolah.',
  })
  excerpt?: string;

  @ApiProperty({ example: 'Isi lengkap berita sekolah minimal 10 karakter.' })
  content!: string;

  @ApiPropertyOptional({ example: '/uploads/prestasi.jpg' })
  thumbnail?: string;

  @ApiProperty({
    enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
    example: 'PUBLISHED',
    required: false,
  })
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

  @ApiPropertyOptional({ example: true })
  isBreaking?: boolean;

  @ApiPropertyOptional({ example: true })
  isFeatured?: boolean;

  @ApiPropertyOptional({
    format: 'date-time',
    example: '2026-05-19T08:00:00.000Z',
  })
  publishedAt?: Date;

  @ApiProperty({ example: 'user_id_admin' })
  authorId!: string;

  @ApiProperty({ example: 'category_id_prestasi' })
  categoryId!: string;
}

export class UpdateNewsDto extends PartialType(CreateNewsDto) {}
