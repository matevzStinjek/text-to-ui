import { Elysia } from "elysia";
import { BunAdapter } from "elysia/adapter/bun";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import { type Logger } from "pino";
import { type Config } from "./config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { handleGenerateTable, generateTableBodySchema } from "./routes/generate-table-route";

export const createApp = ({ log, config }: { log: Logger; config: Config }) => {
  log.info("creating llm clients...");
  const rigidLlm = new ChatGoogleGenerativeAI({
    apiKey: config.geminiApiKey,
    ...config.rigidLlm,
  });

  const creativeLlm = new ChatGoogleGenerativeAI({
    apiKey: config.geminiApiKey,
    ...config.creativeLlm,
  });

  log.info("creating app...");
  const app = new Elysia({ name: "main-app", adapter: BunAdapter })
    .decorate("log", log)
    .decorate("llmClients", { rigidLlm, creativeLlm })
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
    .post("/generate-table", handleGenerateTable, {
      body: generateTableBodySchema,
      detail: {
        summary: "Table Schema Gen Endpoint",
        description: "Receives a prompt and generates a json layout schema for a table.",
      },
    });

  return app;
};

// export the app type for Eden client
export type AppType = ReturnType<typeof createApp>;

// run function with injected dependencies
export function run({ config, log }: { config: Config; log: Logger }) {
  const app = createApp({ log, config });

  app.listen(config.port, (server) => {
    log.info(`service running at http://${server.hostname}:${server.port}`);
    log.info(`docs running at http://${server.hostname}:${server.port}/documentation`);
  });

  return app;
}
