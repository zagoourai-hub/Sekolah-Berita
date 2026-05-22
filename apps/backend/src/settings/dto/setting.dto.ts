import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { z } from 'zod';

const settingValueSchema = z.union([z.string(), z.number(), z.boolean()]);

export const upsertSettingsSchema = z.object({
  settings: z.record(z.string().min(1), settingValueSchema).optional(),
  key: z.string().min(1).optional(),
  value: settingValueSchema.optional(),
});

export const updateSettingSchema = z.object({
  value: settingValueSchema,
});

export class UpsertSettingsDto {
  @ApiPropertyOptional({ example: 'school_name' })
  key?: string;

  @ApiPropertyOptional({ example: 'SMK Nusantara Digital' })
  value?: string | number | boolean;

  @ApiPropertyOptional({
    type: 'object',
    additionalProperties: true,
    example: {
      school_name: 'SMK Nusantara Digital',
      phone: '(021) 1234-5678',
    },
  })
  settings?: Record<string, string | number | boolean>;
}

export class UpdateSettingDto {
  @ApiProperty({
    example: 'SMK Nusantara Digital',
  })
  value!: string | number | boolean;
}
