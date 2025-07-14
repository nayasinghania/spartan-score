import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoResultsProps {
  setActiveTab: (tab: string) => void;
}

export default function NoResults({ setActiveTab }: NoResultsProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <FileText className="h-12 w-12 text-gray-300 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
        No Results Yet
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-4">
        Upload a screenshot to see your GPA calculation
      </p>
      <Button onClick={() => setActiveTab("instructions")} variant="secondary">
        Go to Instructions
      </Button>
    </div>
  );
}
