import { HumanMessage } from "@langchain/core/messages";
import type { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import type { Logger } from "pino";

export async function simpleLLMCall(model: ChatGoogleGenerativeAI, prompt: string, log: Logger) {
  log.debug(`[simpleLLMCall] prompting: ${prompt}`);

  const response = await model.invoke([new HumanMessage(prompt)]);

  log.debug(`[simpleLLMCall] response: ${response.content}`);
  log.debug(`[simpleLLMCall] response metadata: ${response.usage_metadata}`);

  return response;
}
