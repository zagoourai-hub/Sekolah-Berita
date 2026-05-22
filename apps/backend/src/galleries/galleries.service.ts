import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateGalleryDto, UpdateGalleryDto } from './dto/gallery.dto.js';

@Injectable()
export class GalleriesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' },
      take: 12,
    });
  }

  async findOne(id: string) {
    const gallery = await this.prisma.gallery.findUnique({ where: { id } });
    if (!gallery) throw new NotFoundException('Galeri tidak ditemukan');
    return gallery;
  }

  create(input: CreateGalleryDto) {
    return this.prisma.gallery.create({ data: input });
  }

  async update(id: string, input: UpdateGalleryDto) {
    await this.findOne(id);
    return this.prisma.gallery.update({ where: { id }, data: input });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.gallery.delete({ where: { id } });
    return { success: true };
  }
}
