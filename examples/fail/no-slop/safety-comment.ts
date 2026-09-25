type UserId = string & { readonly brand: "UserId" };

export function asUserId(value: string): UserId {
  return value as UserId;
}
