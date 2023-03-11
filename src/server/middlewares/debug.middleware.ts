import { NextFunction, Request, Response } from 'express';

export const appendReqBodyToRes = (req: Request, res: Response, next: NextFunction) => {
  res.locals.debug = {
    request: {
      headers: req.headers,
      body: req.body,
      httpMethod: req.method,
      url: req.originalUrl,
    },
  };
  next();
};
