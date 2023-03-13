import bcrypt from 'bcrypt';
import { customAlphabet } from 'nanoid';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { AccountType } from '@interfaces/app/common.interface';
import { env } from '@config/env';

const jwtIdAlphabet = '0123456789abcdefghijklmnopqrstuvwxyz' as const;
const jwtIdGenerator = customAlphabet(jwtIdAlphabet, 18);

/**
 * @description get bcrypt hash of password
 */
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

/**
 * @description compare password with hashed password
 */
export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * @description generate jwt token with jwt id
 */
export const generateJwtToken = (
  payload: Record<string, any>,
  type: AccountType,
): { token: string; jwtId: string } => {
  const jwtId = jwtIdGenerator();
  const token = jwt.sign(
    {
      data: {
        ...payload,
        type,
      },
    },
    env.JWT_SECRET,
    {
      expiresIn: `${env.JWT_TOKEN_EXPIRE_TIME_IN_HOURS}h`,
      jwtid: jwtId,
    },
  );

  return {
    token,
    jwtId,
  };
};

/**
 * @description get jwt token expiry date
 * @throws {Error}
 */
export const getJwtTokenExpiryDate = (jwtToken: string): Date => {
  const decodedJwtToken = jwt.decode(jwtToken, { json: true });
  if (!decodedJwtToken) {
    throw new Error('Invalid JWT token');
  }

  const { exp } = decodedJwtToken;
  return exp ? moment.unix(exp).toDate() : new Date();
};

/**
 * @description get jwt id from jwt token
 * @throws {Error}
 */
export const getJwtId = (jwtToken: string): string => {
  const decodedJwtToken = jwt.decode(jwtToken, { json: true });
  if (!decodedJwtToken) {
    throw new Error('Invalid JWT token');
  }

  const { jti } = decodedJwtToken;
  if (!jti) {
    throw new Error('Invalid JWT token');
  }

  return jti;
};
