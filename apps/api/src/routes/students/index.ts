import fp from 'fastify-plugin';


export const studentRoutes = fp(async (fastify: any, _opts: any) => {

  fastify.get('/', async (_request: any, _reply: any) => {
    return { message: 'Students endpoint' };
  });
});

export default studentRoutes;
