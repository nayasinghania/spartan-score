"use client";

import { useUpload } from "@/contexts/upload-context";

export default function GradeDisplay() {
	const { parsedImage } = useUpload();

	return (
		<div>
			<h2>Grades</h2>
			{parsedImage && parsedImage.length > 0 ? (
				<ul>
					{parsedImage.map((grade) => (
						<li key={grade.name} className="flex justify-between">
							<p>
								{grade.course} (Section {grade.section}) -&nbsp;
								{grade.name}
							</p>
							<div className="flex">
								<p>
									{grade.letter} ({grade.grade.toFixed(2)}%)&nbsp;-&nbsp;
								</p>
								<p>{grade.points.toFixed(2)}</p>
							</div>
						</li>
					))}
				</ul>
			) : (
				<p>Upload your grades to get started</p>
			)}
		</div>
	);
}
