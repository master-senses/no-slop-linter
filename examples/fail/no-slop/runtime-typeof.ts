export function useName(input: string | number): string {
  if (typeof input === "string") {
    return input;
  }

  return String(input);
}
