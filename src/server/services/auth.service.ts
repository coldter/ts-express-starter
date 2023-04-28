import { Op } from 'sequelize';
import { db } from '@database/index';
import { AccountType } from '@interfaces/app/common.interface';
import { getJwtId, getJwtTokenExpiryDate } from '@helpers/crypto.helper';

/**
 * @description
 */
export const checkTokenStatus = async (
  bearerToken: string,
  accountType: AccountType | '',
): Promise<boolean> => {
  const expiry = getJwtTokenExpiryDate(bearerToken);
  const jwtId = getJwtId(bearerToken);

  return !!(await db.AuthToken.count({
    col: 'id',
    where: {
      accountType,
      bearerToken: jwtId,
      bearerTokenValidTill: {
        [Op.gte]: expiry,
      },
    },
  }));
};
