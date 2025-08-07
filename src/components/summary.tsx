"use client";

import { useEffect, useState } from "react";
import { useUpload } from "@/contexts/upload-context";

export default function Summary() {
	const { parsedImage } = useUpload();
	const [gpa, setGpa] = useState<number | null>(null);

	useEffect(() => {
		if (parsedImage && parsedImage.length > 0) {
			const totalScore = parsedImage.reduce(
				(acc, item) => item.units * item.points + acc,
				0,
			);
			const totalUnits = parsedImage.reduce((acc, item) => item.units + acc, 0);
			const averageScore = totalScore / totalUnits;
			setGpa(averageScore);
		}
	}, [parsedImage]);

	return (
		<div>
			{parsedImage && parsedImage.length > 0 && (
				<div>
					<h2>Summary</h2>
					<p className="font-bold">Spring 2025 GPA</p>
					<p className="font-bold">{gpa?.toFixed(2)}/4.00</p>
				</div>
			)}
		</div>
	);
}
