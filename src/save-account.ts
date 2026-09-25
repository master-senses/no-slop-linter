import { createAccount, parseAccountId, type Account, type AccountInput } from "./domain.ts";

export function saveAccount(rawId: string, input: AccountInput): Account {
  const id = parseAccountId(rawId);

  return createAccount(id, input);
}
