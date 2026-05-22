import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateOrganisasiDto,
  UpdateOrganisasiDto,
} from './dto/create-organisasi.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class OrganisasiService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateOrganisasiDto, uploadedPhotoUrl?: string) {
    const finalPhotoUrl = uploadedPhotoUrl || dto.photoUrl || null;

    return this.prisma.organisasiMember.create({
      data: {
        name: dto.name,
        position: dto.position,
        photoUrl: finalPhotoUrl,
        sortOrder: dto.sortOrder ?? 0,
        Kelas: dto.kelas,
        isActive: dto.isActive ?? true,
      },
    });
  }

  findPublic() {
    return this.prisma.organisasiMember.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        sortOrder: 'asc',
      },
    });
  }

  findAll() {
    return this.prisma.organisasiMember.findMany({
      orderBy: {
        sortOrder: 'asc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.organisasiMember.findUnique({
      where: { id },
    });
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

    return this.prisma.organisasiMember.update({
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
  }

  remove(id: string) {
    return this.prisma.organisasiMember.delete({
      where: { id },
    });
  }
}
