import { Grade } from "@/app/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface SummaryProps {
  totalGPA: number;
  grades: Grade[];
}

export default function Summary({ totalGPA, grades }: SummaryProps) {
  return (
    <Card className="bg-blue-50 dark:bg-blue-950">
      <CardHeader>
        <CardTitle className="text-lg">Academic Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex">
          <p className="text-lg">Overall GPA:&nbsp;</p>
          <p className="text-lg font-bold">
            {((totalGPA || 0) / grades.length).toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
