import { CreationAttributes, Op } from 'sequelize';
import { db } from '@database/index';
import { IUserInfo } from '@interfaces/app/auth.interface';
import { User } from '@models/users.model';
import { ACCOUNT_TYPE } from '@constants/common.constants';
import { AccountType } from '@interfaces/app/common.interface';
import { getJwtId, getJwtTokenExpiryDate } from '@helpers/crypto.helper';

/**
 * @description
 */
export const getUserByEmailOrMobile = async (
  email: string,
  countryCode?: string,
  mobile?: string,
): Promise<IUserInfo | null> => {
  return await db.User.findOne({
    attributes: ['id', 'email', 'countryCode', 'mobile'],
    where: {
      [Op.or]: [
        {
          email,
        },
        {
          countryCode: countryCode || '',
          mobile: mobile || '',
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

/**
 * @description
 */
export const getUserPasswordById = async (id: string): Promise<string | null> => {
  const hashedPassword = await db.Auth.findOne({
    attributes: ['hashedPassword'],
    where: {
      type: ACCOUNT_TYPE.USER,
      typeId: id,
    },
    raw: true,
  });

  return hashedPassword?.hashedPassword || null;
};

/**
 * @description
 */
export const createJwtTokenAuthEntry = async (
  token: { token: string; jwtId: string },
  typeId: string,
  type: AccountType,
  deviceId: string | null = null,
) => {
  const { token: jwtToken, jwtId } = token;
  const validTill = getJwtTokenExpiryDate(jwtToken);

  return await db.AuthToken.create({
    token: jwtId,
    type,
    typeId,
    deviceId,
    validTill,
  });
};

/**
 * @description
 */
export const checkTokenStatus = async (token: string): Promise<boolean> => {
  const expiry = getJwtTokenExpiryDate(token);
  const jwtId = getJwtId(token);

  return !!(await db.AuthToken.count({
    col: 'id',
    where: {
      token: jwtId,
      validTill: {
        [Op.gte]: expiry,
      },
    },
  }));
};
