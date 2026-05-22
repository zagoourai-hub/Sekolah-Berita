import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe.js';
import { AchievementsService } from './achievements.service.js';
import {
  CreateAchievementDto,
  UpdateAchievementDto,
  createAchievementSchema,
  updateAchievementSchema,
} from './dto/achievement.dto.js';

@Controller('achievements')
@ApiTags('Achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get()
  findAll() {
    return this.achievementsService.findAll();
  }

  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: CreateAchievementDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  create(
    @Body(new ZodValidationPipe(createAchievementSchema))
    body: CreateAchievementDto,
  ) {
    return this.achievementsService.create(body);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', example: 'achievement_id' })
  @ApiBody({ type: UpdateAchievementDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateAchievementSchema))
    body: UpdateAchievementDto,
  ) {
    return this.achievementsService.update(id, body);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', example: 'achievement_id' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.achievementsService.remove(id);
  }
}
