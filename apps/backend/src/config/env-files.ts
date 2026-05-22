import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { config as loadDotenv } from 'dotenv';

export function getRuntimeEnv(source: NodeJS.ProcessEnv = process.env) {
  const value = source.APP_ENV ?? source.NODE_ENV ?? 'local';

  if (value === 'production') {
    return 'production';
  }

  if (value === 'test') {
    return 'test';
  }

  return 'local';
}

export function getEnvFilePaths(source: NodeJS.ProcessEnv = process.env) {
  const runtimeEnv = getRuntimeEnv(source);
  const envFile = `.env.${runtimeEnv}`;

  return runtimeEnv === 'local'
    ? [envFile, '.env']
    : [envFile, '.env.local', '.env'];
}

export function loadEnvFiles() {
  for (const envFilePath of getEnvFilePaths()) {
    const fullPath = resolve(process.cwd(), envFilePath);

    if (existsSync(fullPath)) {
      loadDotenv({ path: fullPath });
    }
  }
}
