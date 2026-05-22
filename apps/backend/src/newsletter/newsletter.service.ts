import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { SubscribeNewsletterDto } from './dto/newsletter.dto.js';

@Injectable()
export class NewsletterService {
  constructor(private readonly prisma: PrismaService) {}

  async subscribe(input: SubscribeNewsletterDto) {
    const existing = await this.prisma.newsletterSubscriber.findUnique({
      where: { email: input.email },
    });

    if (existing) {
      throw new ConflictException('Email sudah berlangganan newsletter');
    }

    return this.prisma.newsletterSubscriber.create({ data: input });
  }
}
