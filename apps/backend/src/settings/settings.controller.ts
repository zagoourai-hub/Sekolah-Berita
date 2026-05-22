import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe.js';
import {
  updateSettingSchema,
  upsertSettingsSchema,
  type UpdateSettingDto,
  type UpsertSettingsDto,
} from './dto/setting.dto.js';
import { SettingsService } from './settings.service.js';

@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  findAll() {
    return this.settingsService.findAll();
  }

  @Patch()
  upsert(
    @Body(new ZodValidationPipe(upsertSettingsSchema))
    body: UpsertSettingsDto,
  ) {
    return this.settingsService.upsert(body);
  }

  @Patch(':key')
  updateByKey(
    @Param('key') key: string,
    @Body(new ZodValidationPipe(updateSettingSchema))
    body: UpdateSettingDto,
  ) {
    return this.settingsService.updateByKey(key, body);
  }

  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.settingsService.remove(key);
  }
}
