import { NextFunction, Request, Response } from 'express';
import { logger } from '@utils/logger';
import { HttpException } from '@exceptions/HttpException';
import { HttpStatusCodes } from '@constants/HttpStatusCodes';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (res.headersSent) {
    logger.error('🧯 🔥 ~ errorHandler ~ err', err);
    next(err);
    return;
  }

  let message: string = 'Something went wrong';
  let statusCode: number = HttpStatusCodes.INTERNAL_SERVER_ERROR;
  const success: boolean = false;

  if (err instanceof HttpException) {
    message = err.message;
    statusCode = err.statusCode;
  } else {
    logger.error('🧯 🔥 ~ errorHandler ~ err', err);
  }

  res.status(statusCode).json({
    statusCode,
    success,
    message,
    data: {},
    debug: res.locals.debug,
  });
};
