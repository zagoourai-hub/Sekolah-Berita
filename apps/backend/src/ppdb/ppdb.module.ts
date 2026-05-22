import { Module } from '@nestjs/common';
import { PpdbController } from './ppdb.controller.js';
import { PpdbService } from './ppdb.service.js';

@Module({
  controllers: [PpdbController],
  providers: [PpdbService],
  exports: [PpdbService],
})
export class PpdbModule {}
