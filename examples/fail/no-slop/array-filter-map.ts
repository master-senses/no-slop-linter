type User = { readonly active: boolean; readonly email: string };

export function activeEmails(users: User[]): string[] {
  return users.filter((user) => user.active).map((user) => user.email);
}
