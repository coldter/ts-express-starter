import supertest from 'supertest';
import app from '@server/server';
import { db } from '@database/index';

beforeAll(async () => {
  try {
    // * Sync the database
    await db.sequelize.authenticate({ logging: false });
    await db.sequelize.sync({ logging: false });
    await db.sequelize.sync({ force: true, logging: false });
    console.log('Database synced');
  } catch (error) {
    console.log('🔥 ~ beforeAll ~ error', error);
  }
});

afterAll(async () => {
  // * Close the database connection
  await db.sequelize.close();
});

global.testRequest = supertest(app);
global.db = db;
