import { Options as RateLimitOptions } from 'express-rate-limit';
import { TooManyRequests } from '@exceptions/HttpException';
import { CorsOptions } from 'cors';

/**
 * * CORS options
 */
export const corsOptions: CorsOptions = {
  credentials: true,
  origin: '*',
};

/**
 * * Rate limit options
 */
export const globalProductionRateLimitOptions: Partial<RateLimitOptions> = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to x requests per `window`
  handler: () => {
    throw new TooManyRequests('You have exceeded maximum request limit, please try again later');
  },
  // standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
};

export const globalDevelopmentRateLimitOptions: Partial<RateLimitOptions> = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10000, // Limit each IP to x requests per `window`
  handler: () => {
    throw new TooManyRequests('You have exceeded maximum request limit, please try again later');
  },
  // standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
};
