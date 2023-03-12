import { Request } from 'express';
import { Query } from 'express-serve-static-core';
import type { ValueOf } from 'type-fest';
import { HttpStatusCodes } from '@constants/HttpStatusCodes';

export type HttpStatusCode = ValueOf<typeof HttpStatusCodes>;

export interface IStandardResponse {
  statusCode: HttpStatusCode;
  success: boolean;
  data: any;
  message: string;
  debug?: any;
}

export interface PayloadRequest<T> extends Request {
  body: T;
}

export interface QueryRequest<T extends Query> extends Request {
  query: T;
}
