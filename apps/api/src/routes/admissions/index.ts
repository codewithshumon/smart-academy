import fp from 'fastify-plugin';

export const admissionsRoutes = fp(async (fastify: any, _opts: any) => {

  fastify.get('/', async (_request: any, _reply: any) => {
    return { message: 'Admissions endpoint' };
  });
});

export default admissionsRoutes;
