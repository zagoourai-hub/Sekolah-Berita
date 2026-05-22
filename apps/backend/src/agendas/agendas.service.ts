import { Injectable, NotFoundException } from '@nestjs/common';
import { slugify, uniqueSlug } from '../common/utils/slugify.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateAgendaDto, UpdateAgendaDto } from './dto/agenda.dto.js';

@Injectable()
export class AgendasService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.agenda.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { startDate: 'asc' },
      take: 12,
    });
  }

  async findOne(id: string) {
    const agenda = await this.prisma.agenda.findUnique({ where: { id } });
    if (!agenda) throw new NotFoundException('Agenda tidak ditemukan');
    return agenda;
  }

  create(input: CreateAgendaDto) {
    return this.prisma.agenda.create({
      data: {
        ...input,
        slug: input.slug ? slugify(input.slug) : uniqueSlug(input.title),
      },
    });
  }

  async update(id: string, input: UpdateAgendaDto) {
    await this.findOne(id);
    return this.prisma.agenda.update({
      where: { id },
      data: { ...input, slug: input.slug ? slugify(input.slug) : undefined },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.agenda.delete({ where: { id } });
    return { success: true };
  }
}
