import type { Logger } from "pino";

export type Config = {
  port: number;
  geminiApiKey: string;
};

export function getConfig(getenv: (key: string) => string | undefined, logger: Logger): Config {
  const port = (() => {
    const portEnv = getenv("PORT");
    if (!portEnv) {
      logger.warn(`PORT invalid: "${portEnv}", using default`);
      return 3000;
    }

    const parsedPort = parseInt(portEnv, 10);
    if (isNaN(parsedPort)) {
      logger.warn(`PORT invalid: "${portEnv}", using default`);
      return 3000;
    }
    return parsedPort;
  })();

  const geminiApiKey = getenv("GEMINI_API_KEY");
  if (!geminiApiKey) {
    logger.error("GEMINI_API_KEY invalid, throwing");
    throw new Error("GEMINI_API_KEY required in env");
  }

  return {
    port,
    geminiApiKey,
  };
}
