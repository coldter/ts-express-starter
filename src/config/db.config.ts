import { env } from '@config/env';

export const SequelizeConfig = {
  dialect: 'mysql' as const,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_SCHEMA,
  port: env.DATABASE_PORT,
  host: env.DATABASE_HOST,
  pool: {
    max: env.DATABASE_POOL_MAX,
    min: env.DATABASE_POOL_MIN,
    acquire: env.DATABASE_POOL_ACQUIRE,
    idle: env.DATABASE_POOL_IDLE,
  },
};
