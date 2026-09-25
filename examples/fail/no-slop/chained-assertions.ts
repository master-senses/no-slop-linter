type User = { readonly id: string };

export function asUser(input: string): User {
  return input as object as User;
}
