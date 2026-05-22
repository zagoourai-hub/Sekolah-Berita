import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe.js';
import {
  SubscribeNewsletterDto,
  subscribeNewsletterSchema,
} from './dto/newsletter.dto.js';
import { NewsletterService } from './newsletter.service.js';

@Controller('newsletter')
@ApiTags('Newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post()
  @ApiBody({ type: SubscribeNewsletterDto })
  subscribe(
    @Body(new ZodValidationPipe(subscribeNewsletterSchema))
    body: SubscribeNewsletterDto,
  ) {
    return this.newsletterService.subscribe(body);
  }
}
