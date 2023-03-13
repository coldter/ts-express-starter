const dotenv = require('dotenv');

let envResult = {};

envResult = dotenv.config({
  path: `${process.env.NODE_ENV || ''}.env`,
});

if (envResult.error) {
  console.error('🧯 🔥 ~ envResult.error', envResult.error);

  process.exit(1);
}

const { parsed: env } = envResult;

module.exports = {
  development: {
    dialect: 'mysql',
    username: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_SCHEMA,
    port: env.DATABASE_PORT,
    host: env.DATABASE_HOST,
    pool: {
      max: parseInt(env.DATABASE_POOL_MAX, 10),
      min: parseInt(env.DATABASE_POOL_MIN, 10),
      acquire: parseInt(env.DATABASE_POOL_ACQUIRE, 10),
      idle: parseInt(env.DATABASE_POOL_IDLE, 10),
    },
    logging: true,
  },
  test: {
    dialect: 'mysql',
    username: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_SCHEMA,
    port: env.DATABASE_PORT,
    host: env.DATABASE_HOST,
    pool: {
      max: parseInt(env.DATABASE_POOL_MAX, 10),
      min: parseInt(env.DATABASE_POOL_MIN, 10),
      acquire: parseInt(env.DATABASE_POOL_ACQUIRE, 10),
      idle: parseInt(env.DATABASE_POOL_IDLE, 10),
    },
    logging: true,
  },
  production: {
    dialect: 'mysql',
    username: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_SCHEMA,
    port: env.DATABASE_PORT,
    host: env.DATABASE_HOST,
    pool: {
      max: parseInt(env.DATABASE_POOL_MAX, 10),
      min: parseInt(env.DATABASE_POOL_MIN, 10),
      acquire: parseInt(env.DATABASE_POOL_ACQUIRE, 10),
      idle: parseInt(env.DATABASE_POOL_IDLE, 10),
    },
    logging: true,
  },
};
