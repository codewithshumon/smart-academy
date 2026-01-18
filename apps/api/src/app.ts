import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import jwt from '@fastify/jwt';
import env from '@fastify/env';

const schema = {
  type: 'object',
  required: ['PORT'],
  properties: {
    PORT: {
      type: 'string',
      default: '3000',
    },
    HOST: {
      type: 'string',
      default: '0.0.0.0',
    },
    NODE_ENV: {
      type: 'string',
      default: 'development',
    },
    JWT_SECRET: {
      type: 'string',
      default: 'your-secret-key-change-in-production',
    },
    DATABASE_URL: {
      type: 'string',
    },
    REDIS_URL: {
      type: 'string',
      default: 'redis://localhost:6379',
    },
    CORS_ORIGIN: {
      type: 'string',
      default: '*',
    },
  },
};

export const buildApp = async (opts: Partial<FastifyInstance> = {}): Promise<FastifyInstance> => {
  const app = Fastify({
    logger: {
      level: process.env.LOG_LEVEL ?? 'info',
      transport:
        process.env.NODE_ENV === 'development'
          ? {
              target: 'pino-pretty',
              options: {
                colorize: true,
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
              },
            }
          : undefined,
    },
    ...opts,
  });

  // Register environment variables
  await app.register(env, {
    schema,
    dotenv: true,
  });

  // Get config values from environment
  const config = {
    PORT: process.env.PORT ?? '3000',
    HOST: process.env.HOST ?? '0.0.0.0',
    JWT_SECRET: process.env.JWT_SECRET ?? 'your-secret-key-change-in-production',
    REDIS_URL: process.env.REDIS_URL ?? 'redis://localhost:6379',
    CORS_ORIGIN: process.env.CORS_ORIGIN ?? '*',
  };

  // Register CORS
  await app.register(cors, {
    origin: config.CORS_ORIGIN === '*' ? true : config.CORS_ORIGIN.split(','),
    credentials: true,
  });

  // Register Helmet for security headers
  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
  });

  // Register rate limiting
  await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
    redis: config.REDIS_URL ? { host: 'localhost', port: 6379 } : undefined,
  });

  // Register JWT
  await app.register(jwt, {
    secret: config.JWT_SECRET,
  });

  // Register Swagger/OpenAPI
  await app.register(swagger, {
    openapi: {
      info: {
        title: 'Smart Academy API',
        description: 'Smart Academy Backend API Documentation',
        version: '1.0.0',
      },
      servers: [
        {
          url: `http://${config.HOST}:${config.PORT}`,
          description: 'Development server',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
  });

  // Register Swagger UI
  await app.register(swaggerUi as any, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true,
    },
    staticCSP: true,
    transformStaticCSP: (header: unknown) => header,
    transformSpecification: (swaggerObject: unknown) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });

  // Health check route
  app.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  // Register routes
  await app.register(import('./routes/index'), { prefix: '/api' });

  // Global error handler
  app.setErrorHandler((error: unknown, _request: unknown, reply: unknown) => {
    const err = error as { statusCode?: number; message?: string; code?: string };
    app.log.error(err);

    (reply as { status: (code: number) => { send: (data: unknown) => void } })
      .status(err.statusCode ?? 500)
      .send({
        error: {
          message: err.message ?? 'Internal server error',
          code: err.code ?? 'INTERNAL_SERVER_ERROR',
        },
      });
  });

  // 404 handler
  app.setNotFoundHandler((_request: unknown, reply: unknown) => {
    (reply as { status: (code: number) => { send: (data: unknown) => void } })
      .status(404)
      .send({
        error: {
          message: 'Route not found',
          code: 'NOT_FOUND',
        },
      });
  });

  return app;
};

export default buildApp;
