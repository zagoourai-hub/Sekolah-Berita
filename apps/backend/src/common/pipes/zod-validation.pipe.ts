import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import type { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: unknown) {
    let parsedValue = value;

    for (
      let attempt = 0;
      attempt < 3 && typeof parsedValue === 'string';
      attempt += 1
    ) {
      try {
        parsedValue = JSON.parse(parsedValue);
      } catch {
        break;
      }
    }

    const result = this.schema.safeParse(parsedValue);

    if (!result.success) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors: result.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      });
    }

    return result.data;
  }
}
