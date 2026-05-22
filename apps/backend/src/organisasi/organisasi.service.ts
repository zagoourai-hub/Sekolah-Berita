import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateOrganisasiDto,
  UpdateOrganisasiDto,
} from './dto/create-organisasi.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class OrganisasiService {
  constructor(private readonly prisma: PrismaService) {}

  private normalizeMember<
    T extends {
      Kelas?: string | null;
      [key: string]: unknown;
    },
  >(member: T) {
    const { Kelas, ...rest } = member;

    return {
      ...rest,
      kelas: Kelas ?? null,
    };
  }

  async create(dto: CreateOrganisasiDto, uploadedPhotoUrl?: string) {
    const finalPhotoUrl = uploadedPhotoUrl || dto.photoUrl || null;

    const member = await this.prisma.organisasiMember.create({
      data: {
        name: dto.name,
        position: dto.position,
        photoUrl: finalPhotoUrl,
        sortOrder: dto.sortOrder ?? 0,
        Kelas: dto.kelas,
        isActive: dto.isActive ?? true,
      },
    });

    return this.normalizeMember(member);
  }

  async findPublic() {
    const members = await this.prisma.organisasiMember.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        sortOrder: 'asc',
      },
    });

    return members.map((member) => this.normalizeMember(member));
  }

  async findAll() {
    const members = await this.prisma.organisasiMember.findMany({
      orderBy: {
        sortOrder: 'asc',
      },
    });

    return members.map((member) => this.normalizeMember(member));
  }

  async findOne(id: string) {
    const member = await this.prisma.organisasiMember.findUnique({
      where: { id },
    });

    return member ? this.normalizeMember(member) : null;
  }

  async update(
    id: string,
    dto: UpdateOrganisasiDto,
    uploadedPhotoUrl?: string,
  ) {
    const existing = await this.prisma.organisasiMember.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Data organisasi tidak ditemukan');
    }

    const finalPhotoUrl = uploadedPhotoUrl || dto.photoUrl || existing.photoUrl;

    const member = await this.prisma.organisasiMember.update({
      where: { id },
      data: {
        name: dto.name ?? existing.name,
        position: dto.position ?? existing.position,
        photoUrl: finalPhotoUrl,
        Kelas: dto.kelas ?? existing.Kelas,
        sortOrder: dto.sortOrder ?? existing.sortOrder,
        isActive: dto.isActive ?? existing.isActive,
      },
    });

    return this.normalizeMember(member);
  }

  async remove(id: string) {
    const member = await this.prisma.organisasiMember.delete({
      where: { id },
    });

    return this.normalizeMember(member);
  }
}
