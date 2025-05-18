import { Elysia } from 'elysia';
import { BunAdapter } from 'elysia/adapter/bun'
import { swagger } from '@elysiajs/swagger';
import { cors } from '@elysiajs/cors';
import { type Logger } from 'pino';
import { createSchemaGenRoutes } from './routes/schema';
import { createLogger } from './logger';
import { getConfig, type Config } from './config';

export const createApp = ({ logger }: { logger: Logger }) => {
  const app = new Elysia({ name: 'main-app', adapter: BunAdapter })
    .decorate('log', logger)
    .use(cors())
    .use(
      swagger({
        path: '/documentation',
        documentation: {
          info: {
            title: 'Schema Service API',
            version: '0.1.0',
            description: 'API for schema generation',
          },
        },
      })
    )
    .get('/', () => "ok", {
      detail: {
        summary: 'Service Health Check',
      }
    })
    .group('/api/v1', (groupedApp) => groupedApp.use(createSchemaGenRoutes()))


  return app;
};

// run function with injected dependencies
const run = ({ config, logger }: { config: Config, logger: Logger }) => {
  const app = createApp({ logger });

  const runningApp = app as typeof app & { log: typeof logger };

  runningApp.listen(config.port, (server) => {
    logger.info(`service running at http://${server.hostname}:${server.port}`);
    logger.info(`docs running at http://${server.hostname}:${server.port}/documentation`);
  });

  return runningApp;
};

// main function block
if (import.meta.main) {
  const logger = createLogger()
  const getenv = (key: string) => process.env[key]
  const config = getConfig(getenv, logger)
  run({ config, logger });
}
