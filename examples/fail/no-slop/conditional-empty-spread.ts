export function withTimeout(timeout: number | undefined): { timeout?: number } {
  return {
    ...(timeout !== undefined ? { timeout } : {}),
  };
}
