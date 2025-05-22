import { FewShotPromptTemplate, PromptTemplate } from "@langchain/core/prompts";
import { type BaseChatModel } from "@langchain/core/language_models/chat_models";
import type { Logger } from "pino";
import { z } from "zod";
import { mockDataExamples } from "../prompts/step2-data-gen/few-shot-examples";
import type { TableSpecification } from "../schemas/table-spec-schema";
import { wrappedError } from "~/utils";
import { createItemSchemaFromTableSpec, type MockDataArray } from "../schemas/mock-data-schema";

let mockDataPromptTemplateInstance: FewShotPromptTemplate | null = null;

async function createMockDataPromptTemplate(log: Logger): Promise<FewShotPromptTemplate> {
  if (mockDataPromptTemplateInstance) {
    log.debug("mockDataPromptTemplateInstance exists");
    return mockDataPromptTemplateInstance;
  }

  log.debug("reading step2-data-gen/system-prompt.md");
  const systemPromptText = await Bun.file(
    "./src/llm/prompts/step2-data-gen/system-prompt.md"
  ).text();

  const fewShotExamplePrompt = new PromptTemplate({
    template: "Input Context:\n{llmInput}\n\nJSON Array Output:\n{output}",
    inputVariables: ["llmInput", "output"],
  });

  const fewShotPrompt = new FewShotPromptTemplate({
    examples: mockDataExamples,
    examplePrompt: fewShotExamplePrompt,
    prefix: systemPromptText,
    suffix: "Input Context:\n{currentLlmInput}\n\nJSON Array Output:",
    inputVariables: ["currentLlmInput"],
  });

  mockDataPromptTemplateInstance = fewShotPrompt;
  return mockDataPromptTemplateInstance;
}

function prepareInputForPrompt(
  columns: TableSpecification["columns"],
  rowCount: number,
  mockDataDetails: string | undefined
): string {
  return JSON.stringify({
    columns: columns.map((col) => ({ id: col.id, header: col.header, dataType: col.dataType })), // only relevant columns
    rowCount,
    mockDataDetails: mockDataDetails || "General realistic data based on column names and types.",
  });
}

export async function generateMockData(
  tableSpec: TableSpecification,
  llm: BaseChatModel,
  log: Logger
): Promise<MockDataArray> {
  if (!tableSpec || !tableSpec.columns || tableSpec.columns.length === 0) {
    throw new Error("spec includes no columns");
  }
  if (!tableSpec.requestMockData) {
    log.debug("mock data not requested");
    return [];
  }

  const rowCount = tableSpec.requestedRowCount ?? 5;
  if (rowCount <= 0) {
    log.debug("row count non-positive, skipping generation");
    return [];
  }

  const llmInputString = prepareInputForPrompt(
    tableSpec.columns,
    rowCount,
    tableSpec.mockDataDetails
  );

  try {
    log.debug(`invoking mockDataChain with input string for ${rowCount} rows`);

    const schema = createItemSchemaFromTableSpec(tableSpec.columns);
    const structuredLlm = llm.withStructuredOutput(z.array(schema));
    const template = await createMockDataPromptTemplate(log);
    const mockDataChain = template.pipe(structuredLlm);

    const mockData = await mockDataChain.invoke({ currentLlmInput: llmInputString });
    log.debug({ mockData }, `successfully generated ${mockData.length} rows of mock data via chain`);
    return mockData;
  } catch (error) {
    log.error("error generating mock data via chain: ", error);
    throw wrappedError(error, "Failed to generate mock data using the provided chain.");
  }
}
