import { Body, Controller, Post, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe.js';
import { createEnvConfig, type EnvConfig } from '../config/env.config.js';
import { AuthService } from './auth.service.js';
import { LoginDto, loginSchema } from './dto/login.dto.js';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(
    @Body(new ZodValidationPipe(loginSchema)) body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(body);
    const env = this.configService.get<EnvConfig>('env') ?? createEnvConfig();

    res.cookie(env.jwt.cookieName, result.token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: env.isProduction,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return result;
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    const env = this.configService.get<EnvConfig>('env') ?? createEnvConfig();
    res.clearCookie(env.jwt.cookieName, {
      httpOnly: true,
      sameSite: 'lax',
      secure: env.isProduction,
      path: '/',
    });
    return { success: true };
  }
}
