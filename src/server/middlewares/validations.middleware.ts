import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ArraySchema, ObjectSchema, ValidationError } from 'yup';
import { BadRequest } from '@exceptions/HttpException';

/**
 * @description validate request body
 * @throws {BadRequest | any} if validation fails
 */
export const validateBody =
  (
    schema: ObjectSchema<any, any> | ArraySchema<any, any>,
    stripUnknown: boolean = true,
  ): RequestHandler =>
  async (req: Request, _res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const value = await schema.validate(body, { stripUnknown, abortEarly: false });

      req.body = value;
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        // * format error message
        throw new BadRequest(error.errors.join(', '));
      }

      throw error;
    }
  };

/**
 * @description validate request query
 * @throws {BadRequest | any} if validation fails
 */
export const validateQuery =
  (
    schema: ObjectSchema<any, any> | ArraySchema<any, any>,
    stripUnknown: boolean = true,
  ): RequestHandler =>
  async (req: Request, _res: Response, next: NextFunction) => {
    const { query } = req;

    try {
      const value = await schema.validate(query, { stripUnknown, abortEarly: false });

      req.query = value;
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        // * format error message
        throw new BadRequest(error.errors.join(', '));
      }

      throw error;
    }
  };
