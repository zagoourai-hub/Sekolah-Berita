import { Injectable, NotFoundException } from '@nestjs/common';
import type { Prisma } from '../generated/prisma/client.js';
import { uniqueSlug, slugify } from '../common/utils/slugify.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { ListQueryDto } from '../common/schemas/content.schemas.js';
import type { CreateNewsDto, UpdateNewsDto } from './dto/news.dto.js';

const newsInclude = {
  author: {
    select: { id: true, name: true, email: true, role: true, avatar: true },
  },
  category: true,
} as const;

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(query: ListQueryDto = {}) {
    const where: Prisma.NewsWhereInput = {
      status: query.status ?? 'PUBLISHED',
      OR: query.q
        ? [
            { title: { contains: query.q } },
            { excerpt: { contains: query.q } },
            { content: { contains: query.q } },
          ]
        : undefined,
    };

    return this.prisma.news.findMany({
      where,
      include: newsInclude,
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      take: query.limit ?? 12,
    });
  }

  featured() {
    return this.prisma.news.findMany({
      where: { status: 'PUBLISHED', isFeatured: true },
      include: newsInclude,
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      take: 5,
    });
  }

  breaking() {
    return this.prisma.news.findMany({
      where: { status: 'PUBLISHED', isBreaking: true },
      include: newsInclude,
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      take: 8,
    });
  }

  popular() {
    return this.prisma.news.findMany({
      where: { status: 'PUBLISHED' },
      include: newsInclude,
      orderBy: [{ viewCount: 'desc' }, { publishedAt: 'desc' }],
      take: 5,
    });
  }

  async findBySlug(slug: string) {
    const news = await this.prisma.news.update({
      where: { slug },
      data: { viewCount: { increment: 1 } },
      include: newsInclude,
    });

    if (!news || news.status !== 'PUBLISHED') {
      throw new NotFoundException('Berita tidak ditemukan');
    }

    return news;
  }

  async findById(id: string) {
    const news = await this.prisma.news.findUnique({
      where: { id },
      include: newsInclude,
    });

    if (!news) {
      throw new NotFoundException('Berita tidak ditemukan');
    }

    return news;
  }

  create(input: CreateNewsDto) {
    return this.prisma.news.create({
      data: {
        ...input,
        slug: input.slug ? slugify(input.slug) : uniqueSlug(input.title),
        publishedAt:
          input.status === 'PUBLISHED'
            ? (input.publishedAt ?? new Date())
            : input.publishedAt,
      },
      include: newsInclude,
    });
  }

  async update(id: string, input: UpdateNewsDto) {
    const existing = await this.findById(id);
    return this.prisma.news.update({
      where: { id },
      data: {
        ...input,
        slug: input.slug ? slugify(input.slug) : undefined,
        publishedAt:
          input.status === 'PUBLISHED' && !existing.publishedAt
            ? (input.publishedAt ?? new Date())
            : input.publishedAt,
      },
      include: newsInclude,
    });
  }

  async remove(id: string) {
    await this.findById(id);
    await this.prisma.news.delete({ where: { id } });
    return { success: true };
  }
}
