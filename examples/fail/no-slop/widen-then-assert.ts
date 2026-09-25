type User = { readonly id: string };

export function loadUser(): User {
  return { id: "1" };
}

export function restoreUser(): User {
  const loaded: User = loadUser();
  const stored: unknown = loaded;

  return stored as User;
}
