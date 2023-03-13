import { Response } from 'express';
import { ProtectedRequest } from '@interfaces/express';
import { IJwtPayload } from '@interfaces/app/auth.interface';
import { getUserInfoByUserId } from '@services/user.service';
import { response } from '@helpers/response.helper';

export const getUserInfo = async (req: ProtectedRequest, res: Response) => {
  const entityData = req.entityData as IJwtPayload;
  console.log('🔥 ~ getUserInfo ~ entityData', entityData);
  const { id } = entityData;

  const userInfoRO = await getUserInfoByUserId(id);

  return response(res, userInfoRO, 'User info');
};
