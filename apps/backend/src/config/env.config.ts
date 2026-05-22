import { registerAs } from '@nestjs/config';
import { getRuntimeEnv } from './env-files.js';

function toNumber(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function createEnvConfig(source: NodeJS.ProcessEnv = process.env) {
  const runtimeEnv = getRuntimeEnv(source);
  const nodeEnv = source.NODE_ENV ?? runtimeEnv;
  const frontendUrl =
    source.FRONTEND_URL ?? source.WEB_URL ?? 'http://localhost:3000';

  return {
    nodeEnv,
    runtimeEnv,
    isProduction: nodeEnv === 'production',
    app: {
      port: toNumber(source.APP_PORT ?? source.PORT, 4000),
      apiPrefix: source.API_PREFIX ?? 'api',
      backendUrl: source.BACKEND_URL ?? 'http://localhost:4000',
      frontendUrl,
      corsOrigin: source.CORS_ORIGIN ?? frontendUrl,
      uploadDir: source.UPLOAD_DIR ?? 'uploads',
    },
    database: {
      url:
        source.DATABASE_URL ??
        'mysql://root:password@localhost:3306/db_sekolah',
      host: source.DATABASE_HOST ?? 'localhost',
      port: toNumber(source.DATABASE_PORT, 3306),
      user: source.DATABASE_USER ?? 'root',
      password: source.DATABASE_PASSWORD ?? '',
      name: source.DATABASE_NAME ?? 'db_sekolah',
      connectionLimit: toNumber(source.DATABASE_CONNECTION_LIMIT, 10),
    },
    jwt: {
      secret: source.JWT_SECRET ?? 'change-this-secret',
      expiresIn: source.JWT_EXPIRES_IN ?? '7d',
      cookieName: source.JWT_COOKIE_NAME ?? 'access_token',
    },
    seed: {
      editorName: source.SEED_EDITOR_NAME ?? 'editor',
      editorEmail: source.SEED_EDITOR_EMAIL ?? 'editor@smknusantara.sch.id',
      editorPass:
        source.SEED_EDITOR_PASSWORD ??
        source.SEED_EDITOR_PASSWOR ??
        'editor12345',
      adminName: source.SEED_ADMIN_NAME ?? 'Administrator',
      adminEmail: source.SEED_ADMIN_EMAIL ?? 'admin@smknusantara.sch.id',
      adminPassword: source.SEED_ADMIN_PASSWORD ?? 'admin12345',
    },
  };
}

export type EnvConfig = ReturnType<typeof createEnvConfig>;

export const envConfig = registerAs('env', () => createEnvConfig());
