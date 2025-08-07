"use client";

import { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useUpload } from "@/contexts/upload-context";

export default function GradeDisplay() {
	const { parsedImage, loading } = useUpload();
	const [text, setText] = useState<string>("Upload your grades to get started");

	useEffect(() => {
		if (loading) {
			setText("Loading...");
		} else if (parsedImage && parsedImage.length > 0) {
			setText("");
		}
	}, [loading, parsedImage]);

	return (
		<div>
			<h2>Grades</h2>
			{parsedImage && parsedImage.length > 0 && (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="font-bold">Course</TableHead>
							<TableHead className="hidden md:table-cell font-bold">
								Section
							</TableHead>
							<TableHead className="hidden md:table-cell font-bold">
								Name
							</TableHead>
							<TableHead className="font-bold">Units</TableHead>
							<TableHead className="font-bold">Grade (%)</TableHead>
							<TableHead className="font-bold">Letter</TableHead>
							<TableHead className="font-bold">Points</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{parsedImage.map((grade) => (
							<TableRow key={grade.course}>
								<TableCell>{grade.course}</TableCell>
								<TableCell className="hidden md:table-cell">
									{grade.section}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{grade.name}
								</TableCell>
								<TableCell>{grade.units}</TableCell>
								<TableCell>{grade.grade}</TableCell>
								<TableCell>{grade.letter}</TableCell>
								<TableCell>{grade.points}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
			<p>{text}</p>
		</div>
	);
}
