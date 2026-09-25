export function collectIds(items: { readonly id: string }[]): string[] {
  return items.reduce((acc, item) => acc.concat([item.id]), [] as string[]);
}
