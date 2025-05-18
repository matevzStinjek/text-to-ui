import pino from "pino";

export function createLogger(getenv: (key: string) => string | undefined) {
  const pinoLogger = pino({
    level: getenv("LOG_LEVEL") || "info",
    transport: getenv("NODE_ENV") !== "production" ? { target: "pino-pretty" } : undefined,
  });

  return pinoLogger;
}
