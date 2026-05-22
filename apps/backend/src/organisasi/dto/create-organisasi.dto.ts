import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { z } from 'zod';

const booleanFromFormData = z.preprocess((value) => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === true) return true;
  if (value === false) return false;
  return value;
}, z.boolean());

const numberFromFormData = z.preprocess((value) => {
  if (value === '' || value === undefined || value === null) return 0;

  return Number(value);
}, z.number().int().min(0));

const photoUrlSchema = z.preprocess(
  (value) => {
    if (typeof value !== 'string') return value;

    const trimmed = value.trim();

    if (!trimmed) return undefined;

    return trimmed;
  },
  z
    .string()
    .refine(
      (value) =>
        value.startsWith('http://') ||
        value.startsWith('https://') ||
        value.startsWith('/uploads/'),
      {
        message: 'Link foto harus diawali http://, https://, atau /uploads/',
      },
    )
    .optional(),
);

export const createOrganisasiSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),

  position: z.string().min(3, 'Jabatan minimal 3 karakter'),

  photoUrl: photoUrlSchema,

  kelas: z.string().optional(),

  sortOrder: numberFromFormData.default(0),

  isActive: booleanFromFormData.default(true),
});

export const updateOrganisasiSchema = createOrganisasiSchema.partial();

export class CreateOrganisasiDto {
  @ApiProperty({
    example: 'Ahmad Saputra, S.Pd.',
  })
  name!: string;

  @ApiProperty({
    example: 'Kepala Sekolah',
  })
  position!: string;

  @ApiPropertyOptional({
    example: 'https://example.com/kepala-sekolah.jpg',
    description:
      'Bisa URL online atau path lokal seperti /uploads/organisasi/foto.jpg',
  })
  photoUrl?: string;

  @ApiPropertyOptional({
    example: 1,
    default: 0,
  })
  sortOrder?: number;

  @ApiPropertyOptional({
    example: true,
    default: true,
  })
  isActive?: boolean;

  @ApiPropertyOptional({
    example: 'RPL 4',
  })
  kelas?: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
  })
  photo?: unknown;
}

export class UpdateOrganisasiDto extends PartialType(CreateOrganisasiDto) {}
