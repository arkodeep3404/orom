import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExistingListCard({ title }: { title: string }) {
  return (
    <Card className="w-48 h-48 m-10 text-center">
      <CardHeader>
        <CardTitle> {title} </CardTitle>
      </CardHeader>
    </Card>
  );
}
