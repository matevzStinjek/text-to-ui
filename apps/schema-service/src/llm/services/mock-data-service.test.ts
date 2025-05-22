import { describe, it, expect, beforeAll } from "bun:test";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import type { Logger } from "pino";
import { getConfig } from "~/config";
import { createLogger } from "~/logger";
import { generateMockData } from "./mock-data-service";
import type { TableSpecification } from "../schemas/table-spec-schema";

describe("MockDataService", () => {
  let llm: ChatGoogleGenerativeAI;
  let log: Logger;

  beforeAll(() => {
    const getenv = (key: string) => process.env[key];
    log = createLogger(getenv);
    const config = getConfig(getenv, log);

    llm = new ChatGoogleGenerativeAI({
      apiKey: config.geminiApiKey,
      ...config.creativeLlm,
    });
  });

  it("should. It better.", async () => {
    const exampleSpec = {
      tableTitle: "Sample Products",
      requestedRowCount: 2,
      columns: [
        { id: "productName", header: "Product Name", dataType: "text" },
        { id: "price", header: "Price", dataType: "number" },
      ],
      actions: [],
      userPromptAnalysis: { originalPrompt: "test" },
      requestMockData: true,
      mockDataDetails: "Electronic gadgets",
    } satisfies TableSpecification;

    const data = await generateMockData(exampleSpec, llm, log);

    expect(data.length).toEqual(exampleSpec.requestedRowCount);
  });
});
