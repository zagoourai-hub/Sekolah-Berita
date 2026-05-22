import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AchievementsModule } from './achievements/achievements.module.js';
import { AgendasModule } from './agendas/agendas.module.js';
import { AnnouncementsModule } from './announcements/announcements.module.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { DashboardModule } from './dashboard/dashboard.module.js';
import { GalleriesModule } from './galleries/galleries.module.js';
import { MediaModule } from './media/media.module.js';
import { NewsModule } from './news/news.module.js';
import { NewsletterModule } from './newsletter/newsletter.module.js';
import { PpdbModule } from './ppdb/ppdb.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { SearchModule } from './search/search.module.js';
import { SettingsModule } from './settings/settings.module.js';
import { UsersModule } from './users/users.module.js';
import { envConfig } from './config/env.config.js';
import { getEnvFilePaths } from './config/env-files.js';
import { OrganisasiModule } from './organisasi/organisasi.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilePaths(),
      load: [envConfig],
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    CategoriesModule,
    NewsModule,
    AnnouncementsModule,
    AgendasModule,
    AchievementsModule,
    GalleriesModule,
    PpdbModule,
    MediaModule,
    SettingsModule,
    NewsletterModule,
    DashboardModule,
    SearchModule,
    OrganisasiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
