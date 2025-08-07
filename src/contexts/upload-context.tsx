"use client";

import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { createWorker } from "tesseract.js";
import run from "@/lib/db";
import { GradeTable, SemesterTable } from "@/lib/tables";
import type { Grade } from "@/lib/types";

interface UploadContextType {
	parsedImage: Grade[];
	setUploadedFile: (file: File | null) => void;
	error: string | null;
	loading: boolean;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export function UploadProvider({ children }: { children: ReactNode }) {
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);
	const [parsedImage, setParsedImage] = useState<Grade[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (uploadedFile) {
			setLoading(true);
			const reader = new FileReader();
			reader.readAsDataURL(uploadedFile);
			reader.onloadend = () => {
				(async () => {
					const worker = await createWorker("eng");
					const ret = await worker.recognize(reader.result as string);
					setLoading(false);

					const lines = ret.data.text
						.split("\n")
						.filter((line) => line.includes(":"));
					const grades: Grade[] = [];
					for (const line of lines) {
						const semester = line.split(":") || "error";
						const nameGradeSection = line.split(" - ")[1] || "error";
						const nameGradeList = nameGradeSection.split(" ") || "error";
						const gradeString = nameGradeList
							.filter((item) => item.includes("%"))[0]
							?.split("%")[0];
						const course = semester[1].split(" ")[1].replace("-", " ");
						const section = semester[1].split(" ")[3];
						const grade = parseFloat(gradeString) || 999.99;
						const results = await run(course, section).catch(console.dir);

						if (grade > 900) {
							setError(
								"Unable to parse grades. Please ensure your uploaded the correct image.",
							);
							break;
						}
						grades.push({
							semester:
								SemesterTable.find(
									(semesterObj) =>
										semesterObj.code === semester[0][0] + semester[0][1],
								)?.semester +
									" 20" +
									semester[0][2] +
									semester[0][3] || "Unknown",
							course,
							section,
							grade,
							units: parseInt(results?.units, 10) || 3,
							name: results?.course_title,
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
					if (grades.length === 0) {
						if (error === "") {
							setError("No valid grades found in the image.");
						}
					} else {
						setError("");
					}
					await worker.terminate();
				})();
			};
		}
	}, [uploadedFile, error]);

	const value = {
		parsedImage,
		setUploadedFile,
		error,
		loading,
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
