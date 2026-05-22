import { z } from 'zod';

export const publishStatusSchema = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']);
export const userRoleSchema = z.enum(['ADMIN', 'EDITOR', 'HEADMASTER']);

export const optionalDateSchema = z
  .union([z.coerce.date(), z.literal(''), z.null()])
  .optional()
  .transform((value) => (value === '' || value === null ? undefined : value));

export const slugField = z.string().min(2).max(180).optional();

export const listQuerySchema = z.object({
  q: z.string().optional(),
  status: publishStatusSchema.optional(),
  limit: z.coerce.number().int().min(1).max(50).optional(),
});

export type ListQueryDto = z.infer<typeof listQuerySchema>;
