import { Elysia, t } from 'elysia';
import type { Logger } from 'pino';

const langchainBodySchema = t.Object({
  prompt: t.String(),
});

export const createLangchainRoutes = (logInstance: Logger) => {
  return new Elysia({ name: 'langchain-routes', prefix: '/langchain' })
    .decorate('log', logInstance)
    .post(
      '/endpoint',
      async ({ body, log, set }) => {
        log.info({ body }, 'Received request at /langchain/endpoint');
        set.status = 200;
        return { success: true, message: 'Langchain endpoint hit!', data: body };
      },
      {
        body: langchainBodySchema,
        detail: {
          summary: 'Langchain Interaction Endpoint',
          description: 'Receives a prompt and interacts with a Langchain service.',
          tags: ['Langchain'],
        },
      }
    );
};
