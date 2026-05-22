import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { z } from 'zod';

export const createGallerySchema = z.object({
  title: z.string().min(3),
  image: z.string().min(1),
  description: z.string().optional(),
});

export const updateGallerySchema = createGallerySchema.partial();

export class CreateGalleryDto {
  @ApiProperty({ example: 'Kegiatan Workshop Industri' })
  title!: string;

  @ApiProperty({ example: '/uploads/gallery.jpg' })
  image!: string;

  @ApiPropertyOptional({ example: 'Dokumentasi kegiatan sekolah.' })
  description?: string;
}

export class UpdateGalleryDto extends PartialType(CreateGalleryDto) {}
