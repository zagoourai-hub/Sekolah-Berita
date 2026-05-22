import { Injectable } from '@nestjs/common';
import { mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';
import { diskStorage } from 'multer';
import { createEnvConfig } from '../config/env.config.js';
import { PrismaService } from '../prisma/prisma.service.js';

export const mediaStorage = diskStorage({
  destination: (_req, _file, callback) => {
    const env = createEnvConfig();
    const uploadDir = join(process.cwd(), env.app.uploadDir);
    mkdirSync(uploadDir, { recursive: true });
    callback(null, uploadDir);
  },
  filename: (_req, file, callback) => {
    const safeName = file.originalname
      .replace(extname(file.originalname), '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    callback(null, `${safeName}-${Date.now()}${extname(file.originalname)}`);
  },
});

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.media.findMany({ orderBy: { createdAt: 'desc' } });
  }

  create(file: Express.Multer.File) {
    const url = `/uploads/${file.filename}`;
    return this.prisma.media.create({
      data: {
        filename: file.filename,
        url,
        mimeType: file.mimetype,
        size: file.size,
      },
    });
  }
}
