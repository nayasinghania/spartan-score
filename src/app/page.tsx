"use client";

import type React from "react";
import { useState } from "react";
import { createWorker } from "tesseract.js";
import type { Grade } from "@/app/types";
import { FileText, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { numberToGPA, numberToLetter } from "./grades";
import Header from "@/components/header";
import Instructions from "@/components/instructions";
import Uploader from "@/components/uploader";
import LoadingUI from "@/components/loading-ui";
import GradeTable from "@/components/grade-table";
import ResetButton from "@/components/reset-button";
import Summary from "@/components/summary";
import NoResults from "@/components/no-results";

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
    <div>
      <Header />
      <div className="container p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
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
            <Instructions />
            <Uploader fcn={handleUpload} />
          </TabsContent>

          <TabsContent value="results">
            {loading ? (
              <LoadingUI />
            ) : grades.length > 0 ? (
              <div className="space-y-6">
                <GradeTable grades={grades} />
                <Summary totalGPA={totalGPA} grades={grades} />
                <ResetButton fcn={resetCalculator} />
              </div>
            ) : (
              <NoResults setActiveTab={setActiveTab} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
