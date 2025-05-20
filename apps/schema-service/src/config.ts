import type { Logger } from "pino";
import { z } from "zod";

// Zod schema for LLM configuration
const LlmConfigSchema = z.object({
  model: z.string().default("gemini-1.5-flash-latest"),
  temperature: z.coerce.number().min(0).max(2).default(0.1), // Example validation
  topK: z.coerce.number().int().positive().default(3),
  topP: z.coerce.number().min(0).max(1).default(0.9),
});

// Zod schema for the main configuration
const ConfigSchema = z.object({
  port: z.coerce.number().int().positive().default(3000),
  geminiApiKey: z.string().min(1, "GEMINI_API_KEY is required"), // Added min(1) for presence check
  rigidLlm: LlmConfigSchema.extend({
    temperature: LlmConfigSchema.shape.temperature.default(0.1),
    topK: LlmConfigSchema.shape.topK.default(3),
    topP: LlmConfigSchema.shape.topP.default(0.9),
  }),
  creativeLlm: LlmConfigSchema.extend({
    temperature: LlmConfigSchema.shape.temperature.default(0.5),
    topK: LlmConfigSchema.shape.topK.default(5),
    topP: LlmConfigSchema.shape.topP.default(0.5),
  }),
});

// Infer the Config type from the Zod schema
export type Config = z.infer<typeof ConfigSchema>;

export function getConfig(getenv: (key: string) => string | undefined, logger: Logger): Config {
  const envValues = {
    PORT: getenv("PORT"),
    GEMINI_API_KEY: getenv("GEMINI_API_KEY"),
    RIGID_LLM_MODEL: getenv("RIGID_LLM_MODEL"),
    RIGID_LLM_TEMPERATURE: getenv("RIGID_LLM_TEMPERATURE"),
    RIGID_LLM_TOP_K: getenv("RIGID_LLM_TOP_K"),
    RIGID_LLM_TOP_P: getenv("RIGID_LLM_TOP_P"),
    CREATIVE_LLM_MODEL: getenv("CREATIVE_LLM_MODEL"),
    CREATIVE_LLM_TEMPERATURE: getenv("CREATIVE_LLM_TEMPERATURE"),
    CREATIVE_LLM_TOP_K: getenv("CREATIVE_LLM_TOP_K"),
    CREATIVE_LLM_TOP_P: getenv("CREATIVE_LLM_TOP_P"),
  };

  // Map environment variables to the schema structure before parsing
  const rawConfig = {
    port: envValues.PORT,
    geminiApiKey: envValues.GEMINI_API_KEY,
    rigidLlm: {
      model: envValues.RIGID_LLM_MODEL,
      temperature: envValues.RIGID_LLM_TEMPERATURE,
      topK: envValues.RIGID_LLM_TOP_K,
      topP: envValues.RIGID_LLM_TOP_P,
    },
    creativeLlm: {
      model: envValues.CREATIVE_LLM_MODEL,
      temperature: envValues.CREATIVE_LLM_TEMPERATURE,
      topK: envValues.CREATIVE_LLM_TOP_K,
      topP: envValues.CREATIVE_LLM_TOP_P,
    },
  };

  try {
    const parsedConfig = ConfigSchema.parse(rawConfig);
    logger.info("Configuration loaded and validated successfully.");
    return parsedConfig;
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.error({ issues: error.issues }, "Configuration validation failed:");
    }
    throw new Error("Configuration validation failed. Check logs for details.");
  }
}
