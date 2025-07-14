import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResetButtonProps {
  fcn: () => void;
}

export default function ResetButton({ fcn }: ResetButtonProps) {
  return (
    <div className="flex justify-center mt-6">
      <Button
        onClick={fcn}
        variant="outline"
        className="flex items-center gap-2"
      >
        <Upload className="h-4 w-4" />
        Upload Another Screenshot
      </Button>
    </div>
  );
}
