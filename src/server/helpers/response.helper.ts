import { Response } from 'express';
import type { ValueOf } from 'type-fest';
import { HttpStatusCodes } from '@constants/HttpStatusCodes';

export const response = (
  res: Response,
  data: any = {},
  message: string = 'success',
  statusCode: ValueOf<typeof HttpStatusCodes> = HttpStatusCodes.OK,
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
