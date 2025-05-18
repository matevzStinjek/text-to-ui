import pino from "pino";

export function createLogger() {
  const pinoLogger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined,
  });
  return pinoLogger
}
