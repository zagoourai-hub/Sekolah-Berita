import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const subscribeNewsletterSchema = z.object({
  email: z.string().email('Email tidak valid'),
});

export class SubscribeNewsletterDto {
  @ApiProperty({ example: 'orangtua@example.com' })
  email!: string;
}
