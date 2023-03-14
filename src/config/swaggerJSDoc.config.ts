import type { Options } from 'swagger-jsdoc';

export const swaggerJSDocsOptions: Options = {
  swaggerDefinition: {
    info: {
      title: 'REST API',
      version: '1.0.0',
      description: 'REST API ExpressJS',
    },
  },
  apis: ['./../docs/*.yml'],
};
