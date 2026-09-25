export function run(operation: () => string): string {
  return Reflect.apply(operation, undefined, []);
}
