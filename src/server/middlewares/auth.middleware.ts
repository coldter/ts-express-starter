import jwt, { JwtPayload } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { Unauthorized } from '@exceptions/HttpException';
import { env } from '@config/env';
import { MiddlewareRequest } from '@interfaces/express';
import { checkTokenStatus } from '@services/auth.service';

export const verifyAuthToken = async (
  req: MiddlewareRequest,
  _res: Response,
  next: NextFunction,
) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    throw new Unauthorized('Authorization header is missing');
  }

  const token = authHeaders.split(' ')[1];

  const entityData = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

  const tokeValidity = await checkTokenStatus(token);
  if (!tokeValidity) {
    throw new Unauthorized('Token is invalid');
  }

  req.entityData = entityData.data;
  next();
};
