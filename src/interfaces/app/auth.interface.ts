import { AccountType } from './common.interface';

export interface IJwtPayload {
  id: string;
  email?: string;
  countryCode?: string;
  mobile?: string;
  type: AccountType;
}
