import { Elysia, t } from 'elysia';
import type { Logger } from 'pino';
import type { GeminiLangchain } from '../lib/langchain';

const langchainBodySchema = t.Object({
  prompt: t.String(),
});

export const createSchemaGenRoutes = () => {
  return new Elysia({ name: 'schema-gen-routes', prefix: '/schema-gen' })
    .derive((ctx) => ({
      log: (ctx as any).log as Logger,
      llmClient: (ctx as any).llmClient as GeminiLangchain
    }))
    .post(
      '/generate',
      async ({ body, log, set, llmClient }) => {
        log.info({ body }, 'Received request at /schema-gen/generate');

        const chunk = await llmClient.simpleLLMCall(body.prompt);

        set.status = 200;
        return { success: true, message: chunk.content };
      },
      {
        body: langchainBodySchema,
        detail: {
          summary: 'Schema Gen Endpoint',
          description: 'Receives a prompt and generates a json layout schema.',
        },
      }
    );
}
