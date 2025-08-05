"use client";

import { Input } from "@/components/ui/input";
import { useUpload } from "@/contexts/upload-context";
import { ChangeEvent } from "react";

export default function Upload() {
  const { setUploadedFile } = useUpload();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  return (
    <div>
      <h2>Upload</h2>
      <Input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
}
