import { Response } from 'express';
import {
  createJwtTokenAuthEntry,
  createUser,
  getUserByEmailOrMobile,
  getUserPasswordById,
} from '@services/auth.service';
import { PayloadRequest } from '@interfaces/express';
import { IUserLoginSchema, IUserRegisterSchema } from '@interfaces/app/auth.interface';
import { response } from '@helpers/response.helper';
import { BadRequest } from '@exceptions/HttpException';
import { comparePassword, generateJwtToken, hashPassword } from '@helpers/crypto.helper';
import { HttpStatusCodes } from '@constants/HttpStatusCodes';
import { ACCOUNT_TYPE } from '@constants/common.constants';

/**
 * @description Login a user
 */
export const loginUser = async (req: PayloadRequest<IUserLoginSchema>, res: Response) => {
  const { email, password } = req.body;

  const user = await getUserByEmailOrMobile(email);

  if (!user) {
    throw new BadRequest('Invalid credentials');
  }

  const hashedPassword = await getUserPasswordById(user.id);

  const isPasswordValid = await comparePassword(password, hashedPassword || '');

  if (!isPasswordValid) {
    throw new BadRequest('Invalid credentials');
  }

  // * Generate JWT token
  const token = generateJwtToken(user, ACCOUNT_TYPE.USER);

  await createJwtTokenAuthEntry(token, user.id, ACCOUNT_TYPE.USER);

  return response(res, { token: token.token }, 'User logged in successfully');
};

/**
 * @description Register a new user
 */
export const registerUser = async (req: PayloadRequest<IUserRegisterSchema>, res: Response) => {
  const { email, countryCode, mobile } = req.body;

  const existingUser = await getUserByEmailOrMobile(email, countryCode, mobile);

  if (existingUser) {
    if (existingUser.email === email) {
      throw new BadRequest('Email already exists');
    }

    throw new BadRequest('Mobile already exists');
  }

  const hashedPassword = await hashPassword(req.body.password);

  const createdUser = await createUser(req.body, hashedPassword);

  return response(res, createdUser, 'User created successfully', HttpStatusCodes.CREATED);
};
