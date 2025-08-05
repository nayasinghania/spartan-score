"use client";

import { useUpload } from "@/contexts/upload-context";

export default function GradeDisplay() {
  const { parsedImage } = useUpload();

  return (
    <div>
      <h2>Grade Display</h2>
      {parsedImage && parsedImage.length > 0 ? (
        <ul>
          {parsedImage.map((grade) => (
            <li key={grade.name}>
              <p>
                {grade.semester}: {grade.course} Sec {grade.section} -{" "}
                {grade.name}
              </p>
              <p>{grade.grade}%</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Upload your grades to get started</p>
      )}
    </div>
  );
}
