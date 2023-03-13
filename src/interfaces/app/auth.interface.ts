import { InferType } from 'yup';
import { userRegisterSchema } from '@schemas/auth.schema';

export interface IUserRegisterSchema extends InferType<typeof userRegisterSchema> {}

export interface IUserInfo {
  id: string;
  email: string;
  countryCode: string;
  mobile: string;
}
