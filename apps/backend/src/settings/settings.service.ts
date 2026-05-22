import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { UpdateSettingDto, UpsertSettingsDto } from './dto/setting.dto.js';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const settings = await this.prisma.setting.findMany({
      orderBy: { key: 'asc' },
    });
    return settings.reduce<Record<string, string>>((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});
  }

  async upsert(input: UpsertSettingsDto) {
    const entries: Array<[string, string | number | boolean]> = input.settings
      ? Object.entries(input.settings)
      : input.key
        ? [[input.key, input.value ?? '']]
        : [];

    await Promise.all(
      entries.map(([key, value]) =>
        this.prisma.setting.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value) },
        }),
      ),
    );

    return this.findAll();
  }

  async updateByKey(key: string, input: UpdateSettingDto) {
    const setting = await this.prisma.setting.findUnique({
      where: {
        key,
      },
    });

    if (!setting) {
      throw new NotFoundException(
        `Setting dengan key "${key}" tidak ditemukan`,
      );
    }

    await this.prisma.setting.update({
      where: {
        key,
      },
      data: {
        value: String(input.value ?? ''),
      },
    });

    return this.findAll();
  }

  async remove(key: string) {
    const setting = await this.prisma.setting.findUnique({
      where: {
        key,
      },
    });

    if (!setting) {
      throw new NotFoundException(
        `Setting dengan key "${key}" tidak ditemukan`,
      );
    }

    await this.prisma.setting.delete({
      where: {
        key,
      },
    });

    return this.findAll();
  }
}
