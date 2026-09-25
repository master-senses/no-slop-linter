import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

import { saveAccount } from "./save-account.ts";

export function AccountPanel() {
  const account = saveAccount("acct_100", {
    email: "owner@example.com",
    active: true,
  });

  return (
    <Card className="mt-4 w-full max-w-md">
      <CardTitle className="text-sm">Account</CardTitle>
      <CardContent className="p-0">{account.email}</CardContent>
      <Button size="lg" className="mt-4 w-full">
        Save changes
      </Button>
    </Card>
  );
}
