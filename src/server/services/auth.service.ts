import { CreationAttributes, Op } from 'sequelize';
import { db } from '@database/index';
import { IUserInfo } from '@interfaces/app/auth.interface';
import { User } from '@models/users.model';
import { ACCOUNT_TYPE } from '@constants/common.constants';

/**
 * @description
 */
export const getHelloWorld = () => {
  return 'Hello World!';
};

/**
 * @description
 */
export const getUserByEmailOrMobile = async (
  email: string,
  countryCode: string,
  mobile: string,
): Promise<IUserInfo | null> => {
  return await db.User.findOne({
    attributes: ['id', 'email', 'countryCode', 'mobile'],
    where: {
      [Op.or]: [
        {
          email,
        },
        {
          countryCode,
          mobile,
        },
      ],
    },
    raw: true,
  });
};

/**
 * @description
 * @throws {any}
 */
export const createUser = async (
  userCreationSchema: CreationAttributes<User>,
  hashedPassword: string,
): Promise<User> => {
  const transaction = await db.sequelize.transaction();
  try {
    const user = await db.User.create(userCreationSchema, { transaction });

    await db.Auth.create(
      {
        type: ACCOUNT_TYPE.USER,
        typeId: user.id,
        hashedPassword,
      },
      { transaction },
    );

    await transaction.commit();
    return user;
  } catch (error: any) {
    await transaction.rollback();
    throw error;
  }
};
