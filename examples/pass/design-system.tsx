import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export function BillingCard() {
  return (
    <Card className="mt-6 w-full">
      <CardTitle className="text-lg">Billing</CardTitle>
      <CardContent className="p-6">Invoices stay on the theme spacing scale.</CardContent>
      <Button size="sm" variant="secondary" className="mt-4 w-full">
        Download invoice
      </Button>
    </Card>
  );
}
