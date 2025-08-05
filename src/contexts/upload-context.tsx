"use client";

import { Grade } from "@/lib/types";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { createWorker } from "tesseract.js";
import { GradeTable } from "@/lib/tables";

interface UploadContextType {
  parsedImage: Grade[];
  setUploadedFile: (file: File | null) => void;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export function UploadProvider({ children }: { children: ReactNode }) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [parsedImage, setParsedImage] = useState<Grade[]>([]);

  useEffect(() => {
    if (uploadedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(uploadedFile);
      reader.onloadend = () => {
        (async () => {
          const worker = await createWorker("eng");
          const ret = await worker.recognize(reader.result as string);
          const lines = ret.data.text
            .split("\n")
            .filter((line) => line.includes(":"));
          const grades: Grade[] = [];
          for (const line of lines) {
            const semester = line.split(":");
            const nameGradeSection = line.split(" - ")[1];
            const nameGradeList = nameGradeSection.split(" ");
            const grade = parseFloat(
              nameGradeList
                .filter((item) => item.includes("%"))[0]
                .split("%")[0],
            );
            grades.push({
              semester: semester[0],
              course: semester[1].split(" ")[1],
              section: semester[1].split(" ")[3],
              grade,
              name: nameGradeList
                .filter((item) => !item.includes("%"))
                .join(" "),
              letter:
                GradeTable.find(
                  (gradeObj) =>
                    gradeObj.maxNumber >= grade && gradeObj.minNumber <= grade,
                )?.letter || "F",
              points:
                GradeTable.find(
                  (gradeObj) =>
                    gradeObj.maxNumber >= grade && gradeObj.minNumber <= grade,
                )?.points || 0.0,
            });
          }
          setParsedImage(grades);
          await worker.terminate();
        })();
      };
    }
  }, [uploadedFile]);

  const value = {
    parsedImage,
    setUploadedFile,
  };

  return (
    <UploadContext.Provider value={value}>{children}</UploadContext.Provider>
  );
}

export function useUpload() {
  const context = useContext(UploadContext);
  if (context === undefined) {
    throw new Error("useUpload must be used within an UploadProvider");
  }
  return context;
}
