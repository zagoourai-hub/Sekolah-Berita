import { Injectable, NotFoundException } from '@nestjs/common';
import type { Prisma } from '../generated/prisma/client.js';
import { slugify, uniqueSlug } from '../common/utils/slugify.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type {
  CreateAnnouncementDto,
  UpdateAnnouncementDto,
} from './dto/announcement.dto.js';

@Injectable()
export class AnnouncementsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.announcement.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: [{ isImportant: 'desc' }, { publishedAt: 'desc' }],
      take: 10,
    });
  }

  important() {
    return this.prisma.announcement.findMany({
      where: { status: 'PUBLISHED', isImportant: true },
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      take: 5,
    });
  }

  async findOne(id: string) {
    const announcement = await this.prisma.announcement.findUnique({
      where: { id },
    });
    if (!announcement)
      throw new NotFoundException('Pengumuman tidak ditemukan');
    return announcement;
  }

  create(input: CreateAnnouncementDto) {
    const data: Prisma.AnnouncementCreateInput = {
      ...input,
      slug: input.slug ? slugify(input.slug) : uniqueSlug(input.title),
      publishedAt:
        input.status === 'PUBLISHED'
          ? (input.publishedAt ?? new Date())
          : input.publishedAt,
    };
    return this.prisma.announcement.create({ data });
  }

  async update(id: string, input: UpdateAnnouncementDto) {
    const existing = await this.findOne(id);
    return this.prisma.announcement.update({
      where: { id },
      data: {
        ...input,
        slug: input.slug ? slugify(input.slug) : undefined,
        publishedAt:
          input.status === 'PUBLISHED' && !existing.publishedAt
            ? (input.publishedAt ?? new Date())
            : input.publishedAt,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.announcement.delete({ where: { id } });
    return { success: true };
  }
}
