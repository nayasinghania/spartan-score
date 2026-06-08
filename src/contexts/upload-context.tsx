"use client";

import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { createWorker } from "tesseract.js";
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
		if (!uploadedFile) return;

		let cancelled = false;
		setLoading(true);
		setError(null);
		setParsedImage([]);

		const reader = new FileReader();
		reader.onloadend = () => {
			(async () => {
				const worker = await createWorker("eng");
				try {
					if (typeof reader.result !== "string") {
						throw new Error("Invalid file format");
					}

					const ret = await worker.recognize(reader.result);
					const lines = ret.data.text
						.split("\n")
						.map((line) => line.trim())
						.filter((line) => line.includes(":") && line.includes(" - "));

					const grades: Grade[] = [];
					for (const line of lines) {
						const semester = line.split(":");
						const semesterInfo = semester[1]?.trim().split(/\s+/) ?? [];
						const nameGradeSection = line.split(" - ")[1] ?? "";
						const gradeString = nameGradeSection
							.split(/\s+/)
							.find((item) => item.includes("%"))
							?.split("%")[0];
						const course = semesterInfo[1]?.replace("-", " ");
						const section = semesterInfo[3];
						const grade = Number.parseFloat(gradeString ?? "");

						if (!course || !section || !Number.isFinite(grade)) {
							continue;
						}

						const gradeEntry = GradeTable.find(
							(gradeObj) =>
								gradeObj.maxNumber >= grade && gradeObj.minNumber <= grade,
						);
						const semesterCode = semester[0]?.slice(0, 2) ?? "";
						const semesterYear = semester[0]?.slice(2, 4) ?? "";
						const semesterName =
							SemesterTable.find(
								(semesterObj) => semesterObj.code === semesterCode,
							)?.semester ?? "Unknown";

						grades.push({
							semester:
								semesterName === "Unknown"
									? "Unknown"
									: `${semesterName} 20${semesterYear}`,
							course,
							section,
							grade,
							units: 3,
							name: course,
							letter: gradeEntry?.letter ?? "F",
							points: gradeEntry?.points ?? 0.0,
						});
					}

					if (!cancelled) {
						setParsedImage(grades);
						setError(
							grades.length > 0
								? null
								: "No valid grades found in the uploaded image.",
						);
					}
				} catch {
					if (!cancelled) {
						setParsedImage([]);
						setError(
							"Unable to parse grades. Please ensure you uploaded the correct image.",
						);
					}
				} finally {
					await worker.terminate();
					if (!cancelled) {
						setLoading(false);
					}
				}
			})();
		};
		reader.onerror = () => {
			if (!cancelled) {
				setParsedImage([]);
				setError("Unable to read the uploaded file.");
				setLoading(false);
			}
		};
		reader.readAsDataURL(uploadedFile);

		return () => {
			cancelled = true;
		};
	}, [uploadedFile]);

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
