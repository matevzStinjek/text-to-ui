export function wrappedError(e: unknown, message: string) {
  if (e instanceof Error) {
    message += ` Details: ${e.message}`;
  } else {
    message += ` An unknown error occurred: ${String(e)}`;
  }
  return new Error(message);
}
