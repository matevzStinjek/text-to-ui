import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { describe, it, expect, beforeAll } from "bun:test";
import { getConfig } from "~/config";
import { createLogger } from "~/logger";
import { createTableSpecPromptTemplate, generateTableSpec } from "./table-spec-service";
import type { Logger } from "pino";
import { TableSpecificationSchema } from "../schemas/table-spec-schema";

describe("TableSpecService", () => {
  let llm: ChatGoogleGenerativeAI;
  let log: Logger;

  beforeAll(() => {
    const getenv = (key: string) => process.env[key];
    log = createLogger(getenv);
    const config = getConfig(getenv, log);

    llm = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash-lite",
      apiKey: config.geminiApiKey,
      temperature: 0.1,
      topK: 3,
      topP: 0.9,
    });
  });

  it("should. It better.", async () => {
    const prompt = "build me a annual reports table";
    const structuredLlm = llm.withStructuredOutput(TableSpecificationSchema);

    const template = await createTableSpecPromptTemplate(log);
    const runnable = template.pipe(structuredLlm);
    const res = await generateTableSpec(prompt, runnable, log);

    expect(res).toHaveProperty("columns");
  });
});
