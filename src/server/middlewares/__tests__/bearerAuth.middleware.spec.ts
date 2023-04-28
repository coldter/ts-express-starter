import { Unauthorized } from '@exceptions/HttpException';
import { describe, expect, it, jest } from '@jest/globals';
import { verifyAuthBearerToken } from '@middlewares/bearerAuth.middleware';
import { NextFunction, Request, Response } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

jest.mock('@config/env', () => ({
  env: {
    JWT_SECRET: 'test',
  },
}));
jest.mock('@services/auth.service', () => ({
  checkTokenStatus: jest.fn<() => Promise<boolean>>().mockResolvedValue(false),
}));

beforeEach(() => {
  jest.resetModules();
});

/**
 * Fixtures
 */

/**
 * * Tests
 */
describe('auth middleware test', () => {
  it('should throw Unauthorized error if Authorization header is missing', async () => {
    const req = {
      headers: {},
    } as Request;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    expect(() => verifyAuthBearerToken(req, res, next)).rejects.toThrow(Unauthorized);
  });

  it('should throw Unauthorized error if Authorization header is invalid', async () => {
    const req = {
      headers: {
        authorization: 'bearer invalid',
      },
    } as Request;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    expect(() => verifyAuthBearerToken(req, res, next)).rejects.toThrow(JsonWebTokenError);
  });

  it('should throw Unauthorized if checkTokenStatus returns false', async () => {
    const req = {
      headers: {
        authorization: `bearer ${jwt.sign(
          {
            data: {
              type: 'test',
            },
          },
          'test',
        )}`,
      },
    } as Request;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    await expect(() => verifyAuthBearerToken(req, res, next)).rejects.toThrow(Unauthorized);
  });

  it('should call next if checkTokenStatus returns true with entityData set to req object', async () => {
    const req = {
      headers: {
        authorization: `bearer ${jwt.sign(
          {
            data: {
              type: 'test',
            },
          },
          'test',
        )}`,
      },
    } as any;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    const checkTokenStatusMock = jest.fn<() => Promise<boolean>>().mockResolvedValue(true);
    jest.doMock('@services/auth.service', () => ({
      checkTokenStatus: checkTokenStatusMock,
    }));

    const { verifyAuthBearerToken: verifyAuthTokenMiddleware } = await import(
      '@middlewares/bearerAuth.middleware'
    );

    await verifyAuthTokenMiddleware(req, res, next);

    expect(req.entityData).toEqual({
      type: 'test',
    });
    expect(checkTokenStatusMock).toBeCalledWith(req.headers.authorization.split(' ')[1], 'test');
    expect(next).toHaveBeenCalled();
  });
});
