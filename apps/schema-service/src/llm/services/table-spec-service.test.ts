import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { describe, it, expect, beforeAll } from "bun:test";
import { getConfig } from "~/config";
import { createLogger } from "~/logger";
import { generateTableSpec } from "./table-spec-service";
import type { Logger } from "pino";

describe("TableSpecService", () => {
  let llm: ChatGoogleGenerativeAI;
  let log: Logger;

  beforeAll(() => {
    const getenv = (key: string) => process.env[key];
    log = createLogger(getenv);
    const config = getConfig(getenv, log);

    llm = new ChatGoogleGenerativeAI({
      apiKey: config.geminiApiKey,
      ...config.rigidLlm,
    });
  });

  it("should. It better.", async () => {
    const prompt = "build me a annual reports table";
    const spec = await generateTableSpec(prompt, llm, log);

    expect(spec).toHaveProperty("columns");
  });
});
