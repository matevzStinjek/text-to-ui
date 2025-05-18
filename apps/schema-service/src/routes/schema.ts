import { Elysia, t } from 'elysia';
import type { Logger } from 'pino';

const langchainBodySchema = t.Object({
  prompt: t.String(),
});

export const createSchemaGenRoutes = () => {
  return new Elysia({ name: 'schema-gen-routes', prefix: '/schema-gen' })
    .derive((ctx) => ({
      log: (ctx as any).log as Logger
    }))
    .post(
      '/generate',
      async ({ body, log, set }) => {
        log.info({ body }, 'Received request at /schema-gen/generate');
        set.status = 200;
        return { success: true, message: 'Langchain endpoint hit!', data: body };
      },
      {
        body: langchainBodySchema,
        detail: {
          summary: 'Schema gen Endpoint',
          description: 'Receives a prompt and generates a json layout schema.',
        },
      }
    );
}
