import { env } from '@config/env';
import { logger } from '@utils/logger';
import app from '@server/server';
import { sequelize } from '@database/index';

const { PORT, NODE_ENV } = env;

async function assertDatabaseConnectionOk() {
  logger.info(`Checking database connection...`);

  try {
    // * test the database connection:
    await sequelize.authenticate();
    logger.info('Database connection OK!');
  } catch (error: unknown) {
    logger.info('Unable to connect to the database:');
    logger.error('🧯 🔥 ~ assertDatabaseConnectionOk ~ error', error);
    process.exit(1);
  }
}

async function bootstrap() {
  // * check database connection
  await assertDatabaseConnectionOk();

  // * start the express server
  app.listen(PORT, () => {
    logger.info(`
  =================================
  ======= ENV: ${NODE_ENV} =======
  🚀 App listening on the port ${PORT}
  =================================`);
  });
}

bootstrap();
