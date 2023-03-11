import { Sequelize } from 'sequelize';
import { highlight } from 'cli-highlight';
import { env } from '@config/env';
import { SequelizeConfig as config } from '@config/db.config';
import { usersModel } from '@models/index';

const ENVIRONMENT = env.NODE_ENV;
interface Db {
  User: ReturnType<typeof usersModel>;
  sequelize: Sequelize;
}
const db: Db = {} as Db;

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
db.User = usersModel(sequelize);

// * association initialization for all models
const models = Object.values(db);
models.forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

// * export
db.sequelize = sequelize;

export { db, sequelize };
