"use client";

import type React from "react";

import { useState } from "react";
import { createWorker } from "tesseract.js";
import type { Grade } from "@/app/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Upload, FileText, Calculator, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

const gradeTable = [
  { number: 97, letter: "A+", gpa: 4.0 },
  { number: 94, letter: "A", gpa: 4.0 },
  { number: 90, letter: "A-", gpa: 3.7 },
  { number: 87, letter: "B+", gpa: 3.3 },
  { number: 84, letter: "B", gpa: 3.0 },
  { number: 80, letter: "B-", gpa: 2.7 },
  { number: 77, letter: "C+", gpa: 2.3 },
  { number: 74, letter: "C", gpa: 2.0 },
  { number: 70, letter: "C-", gpa: 1.7 },
  { number: 67, letter: "D+", gpa: 1.3 },
  { number: 64, letter: "D", gpa: 1.0 },
  { number: 60, letter: "D-", gpa: 0.7 },
  { number: 0, letter: "F", gpa: 0.0 },
];

const numberToLetter = (number: number) => {
  for (const item of gradeTable) {
    if (number >= item.number) {
      return item.letter;
    }
  }
};

const numberToGPA = (number: number) => {
  for (const item of gradeTable) {
    if (number >= item.number) {
      return item.gpa;
    }
  }
};

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [totalGPA, setTotalGPA] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>("instructions");

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      setActiveTab("results");

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        (async () => {
          const worker = await createWorker("eng");
          const ret = await worker.recognize(reader.result as string);
          console.log(ret.data.text);
          const tempGrades: Grade[] = [];
          let tempTotal = 0;
          for (const line of ret.data.text.split("\n")) {
            const items = line.split(" ");
            if (line.includes("SP25")) {
              tempTotal +=
                numberToGPA(Number(items[items.length - 1].split("%")[0])) || 0;
              tempGrades.push({
                subject: items[1].split("-")[0],
                code: items[1].split("-")[1],
                semester: line[0] + line[1],
                year: Number("20" + line[2] + line[3]),
                grade: Number(items[items.length - 1].split("%")[0]),
                letter:
                  numberToLetter(
                    Number(items[items.length - 1].split("%")[0]),
                  ) || "",
                gpa:
                  numberToGPA(Number(items[items.length - 1].split("%")[0])) ||
                  0,
              });
              console.log(tempGrades);
            }
          }
          setGrades(tempGrades);
          setTotalGPA(tempTotal);
          setLoading(false);
          await worker.terminate();
        })();
      };
    }
  }

  function resetCalculator() {
    setGrades([]);
    setTotalGPA(0);
    setActiveTab("instructions");
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Card className="border-0 shadow-lg mb-8 dark:bg-gray-900 dark:border-gray-800">
        <CardHeader className="bg-blue-700 dark:bg-blue-900 text-white rounded-t-lg mt-[-20px] py-8">
          <div className="flex items-center gap-2">
            <Calculator className="h-8 w-8" />
            <CardTitle className="text-2xl md:text-3xl font-bold">
              Spartan Score
            </CardTitle>
          </div>
          <CardDescription className="text-blue-100">
            A GPA calculator for SJSU students
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="instructions">
                <Info className="mr-2 h-4 w-4" />
                Instructions
              </TabsTrigger>
              <TabsTrigger value="results">
                <FileText className="mr-2 h-4 w-4" />
                Results
              </TabsTrigger>
            </TabsList>

            <TabsContent value="instructions">
              <Card>
                <CardHeader>
                  <CardTitle>How to Use Spartan Score</CardTitle>
                  <CardDescription>
                    Follow these steps to calculate your GPA
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center h-8 w-8 bg-blue-100 dark:bg-blue-950 rounded-full text-blue-700 dark:text-blue-300">
                      <span className="font-bold">1</span>
                    </div>
                    <p className="dark:text-gray-300">
                      Log in to your SJSU student dashboard
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center h-8 w-8 bg-blue-100 dark:bg-blue-950 rounded-full text-blue-700 dark:text-blue-300">
                      <span className="font-bold">2</span>
                    </div>
                    <p className="dark:text-gray-300">
                      Click &quot;View Grades&quot; on your card view dashboard
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center h-8 w-8 bg-blue-100 dark:bg-blue-950 rounded-full text-blue-700 dark:text-blue-300">
                      <span className="font-bold">3</span>
                    </div>
                    <p className="dark:text-gray-300">
                      Take a screenshot of your grades page
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center h-8 w-8 bg-blue-100 dark:bg-blue-950 rounded-full text-blue-700 dark:text-blue-300">
                      <span className="font-bold">4</span>
                    </div>
                    <p className="dark:text-gray-300">
                      Upload the screenshot below to calculate your GPA
                    </p>
                  </div>

                  <Alert className="mt-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Privacy Note</AlertTitle>
                    <AlertDescription>
                      Your grade data is processed locally in your browser. No
                      information is sent to our servers.
                    </AlertDescription>
                  </Alert>

                  <div className="mt-6">
                    <label htmlFor="file-upload" className="block w-full">
                      <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          PNG, JPG, or JPEG
                        </p>
                      </div>
                      <Input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results">
              {loading ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center py-12">
                    <div className="flex flex-col items-center gap-4">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 dark:border-blue-800 border-t-blue-700 dark:border-t-blue-400"></div>
                      <p className="text-gray-500 dark:text-gray-400">
                        Processing your grades...
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              ) : grades.length > 0 ? (
                <div className="space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Grade Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
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
                    </CardContent>
                  </Card>

                  <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        Academic Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center py-4">
                        <div className="text-4xl font-bold text-blue-700 dark:text-blue-400 mb-2">
                          {((totalGPA || 0) / grades.length).toFixed(2)}
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">
                          Overall GPA
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-center mt-6">
                    <Button
                      onClick={resetCalculator}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Upload Another Screenshot
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
                    No Results Yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Upload a screenshot to see your GPA calculation
                  </p>
                  <Button
                    onClick={() => setActiveTab("instructions")}
                    variant="secondary"
                  >
                    Go to Instructions
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
