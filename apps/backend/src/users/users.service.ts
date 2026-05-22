import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateUserDto, UpdateUserDto } from './dto/user.dto.js';

const publicUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  avatar: true,
  createdAt: true,
  updatedAt: true,
} as const;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      select: publicUserSelect,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: publicUserSelect,
    });

    if (!user) {
      throw new NotFoundException('User tidak ditemukan');
    }

    return user;
  }

  async create(input: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existing) {
      throw new ConflictException('Email sudah digunakan');
    }

    const password = await bcrypt.hash(input.password, 10);
    return this.prisma.user.create({
      data: {
        ...input,
        avatar: input.avatar || undefined,
        password,
      },
      select: publicUserSelect,
    });
  }

  async update(id: string, input: UpdateUserDto) {
    await this.findOne(id);
    const password = input.password
      ? await bcrypt.hash(input.password, 10)
      : undefined;

    return this.prisma.user.update({
      where: { id },
      data: {
        ...input,
        avatar: input.avatar || undefined,
        password,
      },
      select: publicUserSelect,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.user.delete({ where: { id } });
    return { success: true };
  }
}
