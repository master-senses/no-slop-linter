import { createAccount, parseAccountId, type Account } from "../../src/domain.ts";

export function emailsForActiveAccounts(accounts: Account[]): string[] {
  const emails: string[] = [];

  for (const account of accounts) {
    if (account.active) {
      emails.push(account.email);
    }
  }

  return emails;
}

export function indexAccountsByEmail(accounts: Account[]): Record<string, Account> {
  return accounts.reduce((index: Record<string, Account>, account) => {
    index[account.email] = account;

    return index;
  }, {});
}

export type TimeoutOptions = {
  timeout?: number;
};

export function optionalTimeout(timeout: number | undefined): TimeoutOptions {
  const options: TimeoutOptions = {};

  if (timeout !== undefined) {
    options.timeout = timeout;
  }

  return options;
}

export function hasDocument(): boolean {
  return typeof document !== "undefined";
}

export function loadOwner(): Account {
  return createAccount(parseAccountId("acct_1"), {
    email: "owner@example.com",
    active: true,
  });
}
