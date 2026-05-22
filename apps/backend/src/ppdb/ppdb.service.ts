import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreatePpdbDto, UpdatePpdbDto } from './dto/ppdb.dto.js';

@Injectable()
export class PpdbService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.ppdbInfo.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const ppdb = await this.prisma.ppdbInfo.findUnique({ where: { id } });
    if (!ppdb) throw new NotFoundException('Info PPDB tidak ditemukan');
    return ppdb;
  }

  create(input: CreatePpdbDto) {
    return this.prisma.ppdbInfo.create({ data: input });
  }

  async update(id: string, input: UpdatePpdbDto) {
    await this.findOne(id);
    return this.prisma.ppdbInfo.update({ where: { id }, data: input });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.ppdbInfo.delete({ where: { id } });
    return { success: true };
  }
}
