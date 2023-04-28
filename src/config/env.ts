import { config } from 'dotenv';
import * as yup from 'yup';
import { logger } from '@utils/logger';

const dotConfigOutput = config({
  path: `${process.env.NODE_ENV || ''}.env`,
});

if (dotConfigOutput.error) {
  throw dotConfigOutput.error;
}

const envVarsSchema = yup.object().shape({
  NODE_ENV: yup.string().required().default('development'),
  PORT: yup.number().required().default(3000),

  DATABASE_HOST: yup.string().required(),
  DATABASE_USER: yup.string().required(),
  DATABASE_PASSWORD: yup.string().required(),
  DATABASE_PORT: yup.number().required(),
  DATABASE_SCHEMA: yup.string().required(),
  DATABASE_POOL_MAX: yup.number().required(),
  DATABASE_POOL_MIN: yup.number().required(),
  DATABASE_POOL_ACQUIRE: yup.number().required(),
  DATABASE_POOL_IDLE: yup.number().required(),

  JWT_SECRET: yup.string().required(),
  JWT_TOKEN_EXPIRE_TIME_IN_HOURS: yup.number().required(),
});

type EnvVars = yup.InferType<typeof envVarsSchema>;
let parsedEnvVars: EnvVars;

try {
  parsedEnvVars = envVarsSchema.validateSync(process.env, {
    stripUnknown: false,
    abortEarly: false,
    strict: false,
  });
} catch (error: unknown) {
  if (error instanceof yup.ValidationError) {
    logger.error(`Config validation error: ${error.errors.join(', ')}`);
  } else {
    logger.error(`Config validation error: ${error}`);
  }
  process.exit(1);
}

export const env = parsedEnvVars;
