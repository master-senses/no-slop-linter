export function read(owner: { readonly id: string }): unknown {
  return Reflect.get(owner, "id");
}
