import { Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export default function Instructions() {
  return (
    <div>
      <h2>How to Use Spartan Score</h2>
      <p className="pb-4"> Follow these steps to calculate your GPA</p>
      <div className="flex items-start gap-4 pb-4">
        <div className="flex items-center justify-center h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full">
          <span className="font-bold">1</span>
        </div>
        <p className="pt-1">
          Log in to Canvas at{" "}
          <a href="https://sjsu.instructure.com">
            https://sjsu.instructure.com
          </a>
        </p>
      </div>
      <div className="flex items-start gap-4 pb-4">
        <div className="flex items-center justify-center h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full">
          <span className="font-bold">2</span>
        </div>
        <p className="pt-1">
          Click &quot;View Grades&quot; on your card view dashboard
        </p>
      </div>
      <div className="flex items-start gap-4 pb-4">
        <div className="flex items-center justify-center h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full">
          <span className="font-bold">3</span>
        </div>
        <p className="pt-1">
          Take a screenshot of your grades (and crop if needed)
        </p>
      </div>
      <div className="flex items-start gap-4 pb-4">
        <div className="flex items-center justify-center h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full">
          <span className="font-bold">4</span>
        </div>
        <p className="pt-1">
          Upload the screenshot below to calculate your GPA
        </p>
      </div>

      <Alert className="mt-2 bg-blue-50 dark:bg-blue-950">
        <Info className="h-4 w-4" />
        <AlertTitle>Privacy Notice</AlertTitle>
        <AlertDescription>
          Your grade data is processed locally in your browser. No information
          is sent to our servers.
        </AlertDescription>
      </Alert>
    </div>
  );
}
