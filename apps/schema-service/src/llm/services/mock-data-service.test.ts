import { describe, it, expect, beforeAll } from "bun:test";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import type { Logger } from "pino";
import { getConfig } from "~/config";
import { createLogger } from "~/logger";
import { createMockDataPromptTemplate, generateMockData } from "./mock-data-service";
import { createItemSchemaFromTableSpec } from "../schemas/mock-data-schema";
import type { TableSpecification } from "../schemas/table-spec-schema";
import { z } from "zod";

describe("MockDataService", () => {
  let llm: ChatGoogleGenerativeAI;
  let log: Logger;

  beforeAll(() => {
    const getenv = (key: string) => process.env[key];
    log = createLogger(getenv);
    const config = getConfig(getenv, log);

    llm = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash-lite",
      apiKey: config.geminiApiKey,
      temperature: 0.5,
      topK: 5,
      topP: 0.5,
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

    const schema = createItemSchemaFromTableSpec(exampleSpec.columns);
    const structuredLlm = llm.withStructuredOutput(z.array(schema));

    const template = await createMockDataPromptTemplate(log);
    const runnable = template.pipe(structuredLlm);
    const data = await generateMockData(exampleSpec, runnable, log);

    expect(data.length).toEqual(exampleSpec.requestedRowCount);
  });
});
