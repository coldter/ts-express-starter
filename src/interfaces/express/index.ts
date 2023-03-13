import { Request } from 'express';
import { Query } from 'express-serve-static-core';
import type { ValueOf } from 'type-fest';
import { HttpStatusCodes } from '@constants/HttpStatusCodes';
import { IJwtPayload } from '@interfaces/app/auth.interface';

export type HttpStatusCode = ValueOf<typeof HttpStatusCodes>;

export interface IStandardResponse {
  statusCode: HttpStatusCode;
  success: boolean;
  data: any;
  message: string;
  debug?: any;
}

export interface MiddlewareRequest extends Request {
  [key: string]: any;
}

export interface PayloadRequest<T> extends Request {
  body: T;
}

export interface QueryRequest<T extends Query> extends Request {
  query: T;
}

export interface ProtectedRequest extends Request {
  entityData?: IJwtPayload;
}

export interface ProtectedPayloadRequest<T> extends ProtectedRequest {
  body: T;
}

export interface ProtectedQueryRequest<T extends Query> extends ProtectedRequest {
  query: T;
}
