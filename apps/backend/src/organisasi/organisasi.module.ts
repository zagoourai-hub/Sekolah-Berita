import { Module } from '@nestjs/common';
import { OrganisasiService } from './organisasi.service.js';
import { OrganisasiController } from './organisasi.controller.js';

@Module({
  controllers: [OrganisasiController],
  providers: [OrganisasiService],
})
export class OrganisasiModule {}
