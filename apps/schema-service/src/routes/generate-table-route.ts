import { t } from "elysia";
import type { Logger } from "pino";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { generateTableSpec } from "~/llm/services/table-spec-service";
import { generateMockData } from "~/llm/services/mock-data-service";
interface LlmClients {
  rigidLlm: BaseChatModel;
  creativeLlm: BaseChatModel;
}

interface GenerateTableContext {
  body: { prompt: string };
  log: Logger;
  set: { status?: number | string };
  llmClients: LlmClients;
}

export const generateTableBodySchema = t.Object({
  prompt: t.String(),
});

export const handleGenerateTable = async ({
  body,
  log,
  set,
  llmClients: { rigidLlm, creativeLlm },
}: GenerateTableContext) => {
  log.info("received request at /generate-table (handler)", { body });

  try {
    // step 1: generate table spec
    const tableSpecification = await generateTableSpec(body.prompt, rigidLlm, log);
    log.info("table specification generated successfully");

    let mockDataItems: Record<string, any>[] = [];

    // step 2: generate mock data
    if (tableSpecification.requestMockData) {
      if (tableSpecification.columns && tableSpecification.columns.length > 0) {
        mockDataItems = await generateMockData(tableSpecification, creativeLlm, log);
        log.info("mock data generated successfully");
      }
    }

    const result = {
      tableSpecification,
      mockData: mockDataItems,
    };

    set.status = 200;
    return { success: true, data: result };
  } catch (e) {
    log.error({ err: e }, "Error in /generate-table handler");
    set.status = 400; // Or 500 for internal server errors
    if (e instanceof Error) {
      return { success: false, message: e.message };
    }
    return { success: false, message: "An unknown error occurred." };
  }
};
