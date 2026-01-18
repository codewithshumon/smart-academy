import fp from 'fastify-plugin';

export const autoRoutes = fp(async (fastify: any, _opts: any) => {
  fastify.register(import('./auth/index'), { prefix: '/auth' });
  fastify.register(import('./users/index'), { prefix: '/users' });
  fastify.register(import('./students/index'), { prefix: '/students' });
  fastify.register(import('./teachers/index'), { prefix: '/teachers' });
  fastify.register(import('./academic/index'), { prefix: '/academic' });
  fastify.register(import('./admissions/index'), { prefix: '/admissions' });
});

export default autoRoutes;
