import { Module } from '@nestjs/common';
import { AgendasController } from './agendas.controller.js';
import { AgendasService } from './agendas.service.js';

@Module({
  controllers: [AgendasController],
  providers: [AgendasService],
  exports: [AgendasService],
})
export class AgendasModule {}
