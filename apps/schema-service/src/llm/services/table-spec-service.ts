import { FewShotPromptTemplate, PromptTemplate } from "@langchain/core/prompts";
import type { Runnable } from "@langchain/core/runnables";
import type { Logger } from "pino";
import { type TableSpecification } from "../schemas/table-spec-schema";
import { tableSpecExamples } from "../prompts/step1-table-spec/few-shot-examples";
import { wrappedError } from "~/utils";

let tableSpecPromptTemplateInstance: FewShotPromptTemplate | null = null;

export async function createTableSpecPromptTemplate(log: Logger): Promise<FewShotPromptTemplate> {
  if (tableSpecPromptTemplateInstance) {
    log.debug("tableSpecPromptTemplateInstance exists");
    return tableSpecPromptTemplateInstance;
  }

  log.debug("reading step1-table-spec/system-prompt.md");
  const systemPromptText = await Bun.file("./src/llm/prompts/step1-table-spec/system-prompt.md").text();

  const examplePrompt = new PromptTemplate({
    template: "User Prompt:\n{userInput}\n\nJSON Output:\n{output}",
    inputVariables: ["userInput", "output"],
  });

  tableSpecPromptTemplateInstance = new FewShotPromptTemplate({
    examples: tableSpecExamples,
    examplePrompt: examplePrompt,
    prefix: systemPromptText,
    suffix: "User Prompt:\n{userPrompt}\n\nJSON Output:",
    inputVariables: ["userPrompt"],
  });

  log.info("tableSpecPromptTemplateInstance created");
  return tableSpecPromptTemplateInstance;
}

export async function generateTableSpec(
  userPrompt: string,
  tableSpecChain: Runnable<{ userPrompt: string }, TableSpecification>,
  log: Logger
): Promise<TableSpecification> {
  try {
    log.debug(`invoking tableSpecChain with prompt: "${userPrompt}"`);
    const tableSpec = await tableSpecChain.invoke({ userPrompt });

    log.debug("successfully generated table spec");
    return tableSpec;
  } catch (error) {
    log.error("error generating table spec:", error);
    throw wrappedError(error, "Failed to generate table specification using the provided chain.");
  }
}
