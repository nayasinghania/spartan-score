import { Calculator } from "lucide-react";

export default function Page() {
  return (
    <div className="bg-blue-700 dark:bg-blue-900 p-8">
      <div className="flex items-center gap-2">
        <Calculator className="h-8 w-8" />
        <h1>Spartan Score</h1>
      </div>
      <p>A GPA calculator for SJSU students</p>
    </div>
  );
}
