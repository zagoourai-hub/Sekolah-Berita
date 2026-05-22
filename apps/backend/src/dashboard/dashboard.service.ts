import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async stats() {
    const [
      totalNews,
      totalAnnouncements,
      totalAgendas,
      totalAchievements,
      totalGalleries,
      totalUsers,
      totalSubscribers,
      draftNews,
      publishedNews,
    ] = await Promise.all([
      this.prisma.news.count(),
      this.prisma.announcement.count(),
      this.prisma.agenda.count(),
      this.prisma.achievement.count(),
      this.prisma.gallery.count(),
      this.prisma.user.count(),
      this.prisma.newsletterSubscriber.count(),
      this.prisma.news.count({ where: { status: 'DRAFT' } }),
      this.prisma.news.count({ where: { status: 'PUBLISHED' } }),
    ]);

    return {
      totalNews,
      totalAnnouncements,
      totalAgendas,
      totalAchievements,
      totalGalleries,
      totalUsers,
      totalSubscribers,
      draftNews,
      publishedNews,
    };
  }
}
