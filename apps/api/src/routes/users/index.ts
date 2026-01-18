import fp from 'fastify-plugin';


export const userRoutes = fp(async (fastify: any, _opts: any) => {

  fastify.get('/', async (_request: any, _reply: any) => {
    return { message: 'Users endpoint' };
  });
});

export default userRoutes;
