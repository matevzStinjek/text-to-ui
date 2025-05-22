import { t } from "elysia";
import type { Logger } from "pino";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { RunnableLambda, RunnableSequence } from "@langchain/core/runnables";
import { generateTableSpec } from "~/llm/services/table-spec-service";
import { generateMockData } from "~/llm/services/mock-data-service";
import type { TableSpecification } from "~/llm/schemas/table-spec-schema";

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
    const generateSpecLambda = new RunnableLambda({
      func: async (inputPrompt: string): Promise<TableSpecification> => {
        const spec = await generateTableSpec(inputPrompt, rigidLlm, log);
        log.info("table specification generated successfully");
        return spec;
      },
    }).withConfig({ runName: "GenerateTableSpecificationStep" });

    const generateMockDataLambda = new RunnableLambda({
      func: async (tableSpec: TableSpecification) => {
        if (!tableSpec.columns || tableSpec.columns.length === 0) {
          log.error("no columns found in table spec, cannot generate mock data");
          throw new Error("mock data generation failed: no columns were provided in the spec");
        }

        const mockData = await generateMockData(tableSpec, creativeLlm, log);
        log.info("mock data generated successfully");

        return {
          tableSpecification: tableSpec,
          mockData,
        };
      },
    }).withConfig({ runName: "GenerateMockDataStep" });

    const combinedChain = RunnableSequence.from([
      generateSpecLambda,
      generateMockDataLambda,
    ]).withConfig({ runName: "ProcessTableRequestSequence" });

    const result = await combinedChain.invoke(body.prompt);

    set.status = 200;
    return { success: true, data: result };
  } catch (e) {
    log.error({ err: e }, "Error in /generate-table handler");
    set.status = 400;
    if (e instanceof Error) {
      return { success: false, message: e.message };
    }
    return { success: false, message: "An unknown error occurred." };
  }
};
