import { NextFunction, Request, Response } from 'express';
import { logger } from '@utils/logger';
import { HttpException } from '@exceptions/HttpException';
import { HttpStatusCodes } from '@constants/HttpStatusCodes';
import { HttpStatusCode, IStandardResponse } from '@interfaces/express';

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response<IStandardResponse>,
  next: NextFunction,
): void => {
  if (res.headersSent) {
    logger.error('🧯 🔥 ~ errorHandler ~ err', err);
    next(err);
    return;
  }

  let message: string = 'Something went wrong';
  let statusCode: HttpStatusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
  const success: boolean = false;

  if (err instanceof HttpException) {
    message = err.message;
    statusCode = err.statusCode;

    res.status(statusCode).json({
      statusCode,
      success,
      message,
      data: {},
      debug: res.locals.debug,
    });
    return;
  }

  switch (err?.constructor) {
    case SyntaxError: {
      if (err.type === 'entity.parse.failed') {
        message = 'Invalid Formation Of Data';
        statusCode = HttpStatusCodes.BAD_REQUEST;
      }
      break;
    }
    default:
      logger.error('🧯 🔥 ~ errorHandler ~ err', err);
      break;
  }

  res.status(statusCode).json({
    statusCode,
    success,
    message,
    data: {},
    debug: res.locals.debug,
  });
};
