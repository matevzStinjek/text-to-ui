import { Elysia, t } from "elysia";
import { BunAdapter } from "elysia/adapter/bun";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import { type Logger } from "pino";
import { createLogger } from "./logger";
import { getConfig, type Config } from "./config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { simpleLLMCall } from "./services/schema-gen";
import type { AIMessageChunk } from "@langchain/core/messages";

export const createApp = ({ log, config }: { log: Logger; config: Config }) => {
  log.info("creating llm client...");
  const llmClient = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash-lite",
    apiKey: config.geminiApiKey,
    temperature: 0,
  });

  log.info("creating app...");
  const app = new Elysia({ name: "main-app", adapter: BunAdapter })
    .decorate("log", log)
    .decorate("llmClient", llmClient)
    .use(cors())
    .use(
      swagger({
        path: "/documentation",
        documentation: {
          info: {
            title: "Schema Service API",
            version: "0.1.0",
            description: "API for schema generation",
          },
        },
      })
    )
    .get("/", () => "ok", {
      detail: {
        summary: "Service Health Check",
      },
    })
    .post(
      "/generate-table",
      async ({ body, log, set, llmClient }) => {
        log.info({ body }, "Received request at /generate-table");

        let chunk: undefined | AIMessageChunk;
        try {
          chunk = await simpleLLMCall(llmClient, body.prompt, log);
        } catch (e) {
          set.status = 400;
          if (e instanceof Error) {
            return { success: false, message: e.message };
          }
          return { success: false, message: "unknown error" };
        }

        set.status = 200;
        return { success: true, message: chunk.content };
      },
      {
        body: t.Object({
          prompt: t.String(),
        }),
        detail: {
          summary: "Table Schema Gen Endpoint",
          description: "Receives a prompt and generates a json layout schema for a table.",
        },
      }
    );

  return app;
};

// run function with injected dependencies
const run = ({ config, log }: { config: Config; log: Logger }) => {
  const app = createApp({ log, config });

  app.listen(config.port, (server) => {
    log.info(`service running at http://${server.hostname}:${server.port}`);
    log.info(`docs running at http://${server.hostname}:${server.port}/documentation`);
  });

  return app;
};

// main function block
if (import.meta.main) {
  const getenv = (key: string) => process.env[key];
  const log = createLogger(getenv);
  const config = getConfig(getenv, log);
  run({ config, log });
}
