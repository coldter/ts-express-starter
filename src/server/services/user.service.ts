import { db } from '@database/index';
import { IUserInfoRO } from '@interfaces/app/user.interface';

/**
 * @description Get user info by user id
 */
export const getUserInfoByUserId = async (userId: string): Promise<IUserInfoRO | null> => {
  return await db.User.findOne({
    attributes: [
      'id',
      'email',
      'name',
      'dob',
      'countryCode',
      'mobile',
      'profileImage',
      'createdAt',
    ],
    where: {
      id: userId,
    },
    raw: true,
  });
};
