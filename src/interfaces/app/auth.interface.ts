import { InferType } from 'yup';
import { userLoginSchema, userRegisterSchema } from '@schemas/auth.schema';
import { AccountType } from './common.interface';

export interface IUserRegisterSchema extends InferType<typeof userRegisterSchema> {}

export interface IUserLoginSchema extends InferType<typeof userLoginSchema> {}

export interface IUserInfo {
  id: string;
  email: string;
  countryCode: string;
  mobile: string;
}

export interface IJwtPayload {
  id: string;
  email?: string;
  countryCode?: string;
  mobile?: string;
  type: AccountType;
}
