import { Module } from '@nestjs/common';
import { GalleriesController } from './galleries.controller.js';
import { GalleriesService } from './galleries.service.js';

@Module({
  controllers: [GalleriesController],
  providers: [GalleriesService],
  exports: [GalleriesService],
})
export class GalleriesModule {}
