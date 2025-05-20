import { run } from "./app";
import { getConfig } from "./config";
import { createLogger } from "./logger";

// main function block
if (import.meta.main) {
  const getenv = (key: string) => process.env[key];
  const log = createLogger(getenv);
  const config = getConfig(getenv, log);
  run({ config, log });
}
