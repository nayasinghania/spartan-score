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
							<TableHead>Code</TableHead>
							<TableHead>Section</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Units</TableHead>
							<TableHead>Grade</TableHead>
							<TableHead>Letter</TableHead>
							<TableHead>Points</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{parsedImage.map((grade) => (
							<TableRow key={grade.course}>
								<TableCell>{grade.course}</TableCell>
								<TableCell>{grade.section}</TableCell>
								<TableCell>{grade.name}</TableCell>
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
