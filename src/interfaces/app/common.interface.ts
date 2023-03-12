import { ACCOUNT_STATUS, ACCOUNT_TYPE } from '@constants/common.constants';
import type { ValueOf } from 'type-fest';

export type AccountType = ValueOf<typeof ACCOUNT_TYPE>;

export type AccountStatus = ValueOf<typeof ACCOUNT_STATUS>;
