import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { z } from 'zod';
import { userRoleSchema } from '../../common/schemas/content.schemas.js';

export const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: userRoleSchema.default('EDITOR'),
  avatar: z.string().url().optional().or(z.literal('')),
});

export const updateUserSchema = createUserSchema
  .omit({ password: true })
  .extend({ password: z.string().min(6).optional() })
  .partial();

export class CreateUserDto {
  @ApiProperty({ example: 'user Sekolah' })
  name!: string;

  @ApiProperty({ example: 'editor@smknusantara.sch.id' })
  email!: string;

  @ApiProperty({ example: 'editor12345' })
  password!: string;

  @ApiProperty({
    enum: ['ADMIN', 'EDITOR', 'HEADMASTER'],
    example: 'EDITOR',
    required: false,
  })
  role?: 'ADMIN' | 'EDITOR' | 'HEADMASTER';

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg' })
  avatar?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
