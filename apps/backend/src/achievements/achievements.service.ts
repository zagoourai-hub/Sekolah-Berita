import { Injectable, NotFoundException } from '@nestjs/common';
import { slugify, uniqueSlug } from '../common/utils/slugify.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type {
  CreateAchievementDto,
  UpdateAchievementDto,
} from './dto/achievement.dto.js';

@Injectable()
export class AchievementsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.achievement.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: [{ date: 'desc' }, { createdAt: 'desc' }],
      take: 12,
    });
  }

  async findOne(id: string) {
    const achievement = await this.prisma.achievement.findUnique({
      where: { id },
    });
    if (!achievement) throw new NotFoundException('Prestasi tidak ditemukan');
    return achievement;
  }

  create(input: CreateAchievementDto) {
    return this.prisma.achievement.create({
      data: {
        ...input,
        slug: input.slug ? slugify(input.slug) : uniqueSlug(input.title),
      },
    });
  }

  async update(id: string, input: UpdateAchievementDto) {
    await this.findOne(id);
    return this.prisma.achievement.update({
      where: { id },
      data: { ...input, slug: input.slug ? slugify(input.slug) : undefined },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.achievement.delete({ where: { id } });
    return { success: true };
  }
}
