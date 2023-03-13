import { Sequelize } from 'sequelize';
import { highlight } from 'cli-highlight';
import { env } from '@config/env';
import { SequelizeConfig as config } from '@config/db.config';
import { authModel, authTokenModel, usersModel } from '@models/index';

const ENVIRONMENT = env.NODE_ENV;
interface Db {
  Auth: ReturnType<typeof authModel>;
  AuthToken: ReturnType<typeof authTokenModel>;
  User: ReturnType<typeof usersModel>;
  sequelize: Sequelize;
}

// * sequelize instance initialization
const sequelize = new Sequelize({
  ...config,
  logging:
    ENVIRONMENT === 'production'
      ? false
      : (str, timing) => {
          console.info(
            '⭐⭐⭐⭐⭐ ~ SEQUELIZE LOG',
            highlight(str, { language: 'sql', ignoreIllegals: true }),
            timing ? `⏱ ${timing}ms` : '',
          );
        },
  logQueryParameters: ENVIRONMENT !== 'production',
  benchmark: ENVIRONMENT !== 'production',
});

// * Models
const db: Db = {
  Auth: authModel(sequelize),
  AuthToken: authTokenModel(sequelize),
  User: usersModel(sequelize),
  sequelize,
};

// * association initialization for all models
const models = Object.values(db);
models.forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

// * export
export { db, sequelize };
