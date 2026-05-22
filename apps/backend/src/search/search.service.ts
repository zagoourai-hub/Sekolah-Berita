import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async search(q = '') {
    const keyword = q.trim();

    if (!keyword) {
      return {
        news: [],
        announcements: [],
        agendas: [],
        achievements: [],
        galleries: [],
        ppdb: [],
      };
    }

    const [news, announcements, agendas, achievements, galleries, ppdb] =
      await Promise.all([
        this.prisma.news.findMany({
          where: {
            status: 'PUBLISHED',
            OR: [
              { title: { contains: keyword } },
              { excerpt: { contains: keyword } },
              { content: { contains: keyword } },
            ],
          },
          include: { category: true },
          take: 8,
        }),
        this.prisma.announcement.findMany({
          where: {
            status: 'PUBLISHED',
            OR: [
              { title: { contains: keyword } },
              { content: { contains: keyword } },
            ],
          },
          take: 5,
        }),
        this.prisma.agenda.findMany({
          where: {
            status: 'PUBLISHED',
            OR: [
              { title: { contains: keyword } },
              { description: { contains: keyword } },
              { location: { contains: keyword } },
            ],
          },
          take: 5,
        }),
        this.prisma.achievement.findMany({
          where: {
            status: 'PUBLISHED',
            OR: [
              { title: { contains: keyword } },
              { description: { contains: keyword } },
              { winner: { contains: keyword } },
            ],
          },
          take: 5,
        }),
        this.prisma.gallery.findMany({
          where: {
            OR: [
              { title: { contains: keyword } },
              { description: { contains: keyword } },
            ],
          },
          take: 5,
        }),
        this.prisma.ppdbInfo.findMany({
          where: {
            status: 'PUBLISHED',
            OR: [
              { title: { contains: keyword } },
              { content: { contains: keyword } },
            ],
          },
          take: 3,
        }),
      ]);

    return { news, announcements, agendas, achievements, galleries, ppdb };
  }
}
