import { Button } from "@/components/ui/button";

export function DynamicSave({ color }: { color: string }) {
  return <Button className={`bg-${color}`}>Save changes</Button>;
}
