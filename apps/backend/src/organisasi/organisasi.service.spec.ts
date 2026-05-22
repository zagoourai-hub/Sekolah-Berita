import { Test, TestingModule } from '@nestjs/testing';
import { OrganisasiService } from './organisasi.service';

describe('OrganisasiService', () => {
  let service: OrganisasiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganisasiService],
    }).compile();

    service = module.get<OrganisasiService>(OrganisasiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
