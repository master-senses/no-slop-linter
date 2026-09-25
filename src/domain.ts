export type AccountId = string & { readonly brand: "AccountId" };

export type Account = {
  readonly id: AccountId;
  readonly email: string;
  readonly active: boolean;
};

export type AccountInput = {
  readonly email: string;
  readonly active: boolean;
};

export function parseAccountId(value: string): AccountId {
  if (value.length === 0) {
    throw new Error("Account id is required.");
  }

  // SAFETY: empty ids were rejected above; the remaining string is the branded identifier.
  return value as AccountId;
}

export function createAccount(id: AccountId, input: AccountInput): Account {
  return {
    id,
    email: input.email,
    active: input.active,
  };
}
