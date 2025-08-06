"use client";

import { useUpload } from "@/contexts/upload-context";
import { useEffect, useState } from "react";

export default function Summary() {
  const { parsedImage } = useUpload();
  const [gpa, setGpa] = useState<number | null>(null);

  useEffect(() => {
    if (parsedImage && parsedImage.length > 0) {
      const totalScore = parsedImage.reduce(
        (acc, item) => 3 * item.points + acc,
        0,
      );
      const totalUnits = 3 * parsedImage.length;
      const averageScore = totalScore / totalUnits;
      setGpa(averageScore);
    }
  }, [parsedImage]);

  return (
    <div>
      {parsedImage && parsedImage.length > 0 && (
        <div>
          <h2>Summary</h2>
          <p>
            Your current GPA for the {parsedImage[0].semester} semester is{" "}
            <strong>{gpa?.toFixed(2)}</strong>/4.00, assuming each course is
            worth 3 units.
          </p>
        </div>
      )}
    </div>
  );
}
