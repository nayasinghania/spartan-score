import { Grade } from "@/app/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface GradeTableProps {
  grades: Grade[];
}

export default function GradeTable({ grades }: GradeTableProps) {
  return (
    <div>
      <h2 className="mb-4">Grade Breakdown</h2>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-800">
            <TableRow>
              <TableHead>Class</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Number Grade</TableHead>
              <TableHead>Letter Grade</TableHead>
              <TableHead>GPA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {grades.map((grade, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{`${grade.subject} ${grade.code}`}</TableCell>
                <TableCell>{`${grade.semester} ${grade.year}`}</TableCell>
                <TableCell>{grade.grade}%</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      grade.letter.startsWith("A")
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : grade.letter.startsWith("B")
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          : grade.letter.startsWith("C")
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            : grade.letter.startsWith("D")
                              ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    }`}
                  >
                    {grade.letter}
                  </span>
                </TableCell>
                <TableCell>{grade.gpa.toFixed(1)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
