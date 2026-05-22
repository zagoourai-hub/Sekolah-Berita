import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

export class LoginDto {
  @ApiProperty({ example: 'admin@smknusantara.sch.id' })
  email!: string;

  @ApiProperty({ example: 'admin12345' })
  password!: string;
}
