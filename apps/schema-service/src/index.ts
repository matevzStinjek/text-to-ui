import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';

export const createApp = (systemParams: { port?: number } = {}) => {
  const app = new Elysia()
    .use(swagger())
    .get('/', () => "Hello Elysia on Bun!");

  return app;
};

const run = (systemParams: { port?: number } = {}) => {
  const port = systemParams.port || 3000;
  const app = createApp(systemParams).listen(port);
};

if (import.meta.main) {
  run();
}