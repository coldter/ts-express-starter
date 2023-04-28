import type { Options } from 'swagger-jsdoc';
import { join } from 'path';

const docsPath = join(__dirname, '..', '..', 'docs', '*.yml');
export const swaggerJSDocsOptions: Options = {
  swaggerDefinition: {
    openapi: '3.0.3',
    info: {
      title: 'REST API',
      version: '1.0.0',
      description: 'REST API ExpressJS',
    },
    servers: [
      {
        url: '{baseUrl}/api/v1/',
        variables: {
          baseUrl: {
            default: 'http://localhost:3000',
          },
        },
      },
    ],
  },
  apis: [docsPath],
};
