import { buildApp } from './app';

const start = async () => {
  try {
    const app = await buildApp();

    const host = process.env.HOST ?? '0.0.0.0';
    const port = Number(process.env.PORT ?? 3000);

    await app.listen({ port, host });

    console.log(`🚀 Server ready at http://${host}:${port}`);
    console.log(`📚 API Documentation available at http://${host}:${port}/docs`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
