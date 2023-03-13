import { Request, Response } from 'express';
import { createUser, getHelloWorld, getUserByEmailOrMobile } from '@services/auth.service';
import { PayloadRequest } from '@interfaces/express';
import { IUserRegisterSchema } from '@interfaces/app/auth.interface';
import { response } from '@helpers/response.helper';
import { BadRequest } from '@exceptions/HttpException';
import { hashPassword } from '@helpers/crypto.helper';
import { HttpStatusCodes } from '@constants/HttpStatusCodes';

/**
 * @description Login a user
 */
export const loginUser = async (req: Request, res: Response) => {
  res.send(getHelloWorld());
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
