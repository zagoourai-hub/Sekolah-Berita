import { createEnvConfig } from '../config/env.config.js';

export function getDatabaseOptions(source: NodeJS.ProcessEnv = process.env) {
  const env = createEnvConfig(source);

  return {
    host: env.database.host,
    port: env.database.port,
    user: env.database.user,
    password: env.database.password,
    database: env.database.name,
    connectionLimit: env.database.connectionLimit,
  };
}
