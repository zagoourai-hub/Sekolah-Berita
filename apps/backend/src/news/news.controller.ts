import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe.js';
import {
  listQuerySchema,
  type ListQueryDto,
} from '../common/schemas/content.schemas.js';
import {
  CreateNewsDto,
  UpdateNewsDto,
  createNewsSchema,
  updateNewsSchema,
} from './dto/news.dto.js';
import { NewsService } from './news.service.js';

@Controller('news')
@ApiTags('News')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiQuery({ name: 'q', required: false, example: 'prestasi' })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
  })
  @ApiQuery({ name: 'limit', required: false, example: 12 })
  findAll(@Query(new ZodValidationPipe(listQuerySchema)) query: ListQueryDto) {
    return this.newsService.findAll(query);
  }

  @Get('featured')
  featured() {
    return this.newsService.featured();
  }

  @Get('breaking')
  breaking() {
    return this.newsService.breaking();
  }

  @Get('popular')
  popular() {
    return this.newsService.popular();
  }

  @Get(':slug')
  @ApiParam({ name: 'slug', example: 'siswa-raih-juara-1-lomba-web-design' })
  findBySlug(@Param('slug') slug: string) {
    return this.newsService.findBySlug(slug);
  }

  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: CreateNewsDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  create(@Body(new ZodValidationPipe(createNewsSchema)) body: CreateNewsDto) {
    return this.newsService.create(body);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', example: 'news_id' })
  @ApiBody({ type: UpdateNewsDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateNewsSchema)) body: UpdateNewsDto,
  ) {
    return this.newsService.update(id, body);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', example: 'news_id' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}
