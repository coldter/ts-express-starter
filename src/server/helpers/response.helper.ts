import { Response } from 'express';
import { HttpStatusCodes } from '@constants/HttpStatusCodes';
import { HttpStatusCode, IStandardResponse } from '@interfaces/express';

export const response = (
  res: Response<IStandardResponse>,
  data: any = {},
  message: string = 'success',
  statusCode: HttpStatusCode = HttpStatusCodes.OK,
  success: boolean = true,
): void => {
  res.status(statusCode).json({
    statusCode,
    success,
    data,
    message,
    debug: res.locals.debug,
  });
};
