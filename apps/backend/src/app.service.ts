import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      service: 'sekolah-tema-berita-api',
      timestamp: new Date().toISOString(),
    };
  }
}
