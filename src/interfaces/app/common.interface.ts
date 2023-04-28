import { ACCOUNT_STATUS, ACCOUNT_TYPE, FILE_MIME_TYPES } from '@constants/common.constants';
import type { ValueOf } from 'type-fest';

export interface IPaginationRO {
  previousPage: number | null;
  nextPage: number | null;
  total: number;
  data: any[];
  currentPage: number;
  timestamp: number;
  limit: number;
}

export type AccountType = ValueOf<typeof ACCOUNT_TYPE>;

export type AccountStatus = ValueOf<typeof ACCOUNT_STATUS>;

export type FileMimeType = ValueOf<typeof FILE_MIME_TYPES>;
