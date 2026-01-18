import fp from 'fastify-plugin';

/**
 * Authentication routes
 */
export const authRoutes = fp(async (fastify: any, _opts: any) => {
  // Login route
  fastify.post(
    '/login',
    {
      schema: {
        description: 'User login',
        tags: ['Authentication'],
        body: {
          type: 'object',
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
          },
          required: ['email', 'password'],
        },
        response: {
          200: {
            type: 'object',
            properties: {
              token: { type: 'string' },
              user: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  email: { type: 'string' },
                  name: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
    async (request: any, _reply: any) => {
      const { email } = request.body as { email: string; password: string };

      // TODO: Implement actual authentication logic
      // This is a placeholder - replace with real authentication

      // For now, return a mock response
      const token = fastify.jwt.sign({ email, id: 'user-123' });

      return {
        token,
        user: {
          id: 'user-123',
          email,
          name: 'Test User',
        },
      };
    }
  );

  // Register route
  fastify.post(
    '/register',
    {
      schema: {
        description: 'User registration',
        tags: ['Authentication'],
        body: {
          type: 'object',
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 8 },
            name: { type: 'string' },
          },
          required: ['email', 'password', 'name'],
        },
        response: {
          201: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              user: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  email: { type: 'string' },
                  name: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
    async (request: any, reply: any) => {
      const { email, name } = request.body as {
        email: string;
        password: string;
        name: string;
      };

      // TODO: Implement actual registration logic
      // This is a placeholder - replace with real registration

      reply.status(201);
      return {
        message: 'User registered successfully',
        user: {
          id: 'user-123',
          email,
          name,
        },
      };
    }
  );

  // Refresh token route
  fastify.post(
    '/refresh',
    {
      schema: {
        description: 'Refresh access token',
        tags: ['Authentication'],
        body: {
          type: 'object',
          properties: {
            refreshToken: { type: 'string' },
          },
          required: ['refreshToken'],
        },
      },
    },
    async (_request: any, _reply: any) => {
      // TODO: Implement actual refresh token logic
      // This is a placeholder - replace with real refresh logic

      const token = fastify.jwt.sign({ email: 'user@example.com', id: 'user-123' });

      return {
        token,
      };
    }
  );
});

export default authRoutes;
