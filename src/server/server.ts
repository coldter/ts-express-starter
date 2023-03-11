import 'express-async-errors';
import express, { Application } from 'express';
import compression from 'compression';
import cors from 'cors';
import { errorHandler } from '@middlewares/errorHandler.middleware';
import { apiV1Router } from '@routes/routes';

import { corsOptions } from '@config/server.config';
import { NotFound } from '@exceptions/HttpException';
import { env } from '@config/env';
import { appendReqBodyToRes } from '@middlewares/debug.middleware';
import { developmentLogger } from '@middlewares/expressLogging.middleware';

const ENVIRONMENT = env.NODE_ENV;

const app: Application = express();

/**
 * * Global middlewares
 */
app.use(compression());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (ENVIRONMENT !== 'production') {
  app.use(developmentLogger);
  app.use(appendReqBodyToRes);
}

/**
 * * App's api routes with versioning...
 */
app.use('/api/v1', apiV1Router);

/**
 * * Error handling
 */
// * Not found handler
app.use(() => {
  throw new NotFound();
});
app.use(errorHandler);

export default app;
