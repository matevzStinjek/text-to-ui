import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
import type { Logger } from "pino";
import type { Config } from "../config";

export class GeminiLangchain {
  private readonly model: ChatGoogleGenerativeAI;

  constructor(
    private readonly logger: Logger,
    config: Config,
  ) {
    this.model = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash-lite",
      apiKey: config.geminiApiKey,
      temperature: 0,
    })
  }

  async simpleLLMCall(prompt: string) {
    this.logger.debug(`[simpleLLMCall] prompting: ${prompt}`);

    const response = await this.model.invoke([
      new HumanMessage(prompt)
    ])

    this.logger.debug(`[simpleLLMCall] response: ${response.content}`)
    this.logger.debug(`[simpleLLMCall] response metadata: ${response.usage_metadata}`)

    return response
  }
}