import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";

interface UploadProps {
  fcn: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Uploader({ fcn }: UploadProps) {
  return (
    <div className="mt-6">
      <label htmlFor="file-upload" className="block w-full">
        <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <Upload className="h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 dark:text-grdiday-400">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            PNG, JPG, or JPEG
          </p>
        </div>
        <Input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={fcn}
          className="hidden"
        />
      </label>
    </div>
  );
}
