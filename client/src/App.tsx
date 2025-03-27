"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { GraduationCap } from "lucide-react"

// Sample data
const initialClasses = [
  { id: 1, name: "CS 46B", semester: "Spring 2025", grade: "A", units: 4 },
  { id: 2, name: "MATH 42", semester: "Spring 2025", grade: "B+", units: 3 },
  { id: 3, name: "LING 21", semester: "Spring 2025", grade: "A-", units: 3 },
  { id: 4, name: "BIOL 10", semester: "Spring 2025", grade: "A-", units: 3 },
  { id: 5, name: "MUSC 13", semester: "Spring 2025", grade: "A", units: 1 },
]

// Grade point values
const gradePoints: Record<string, number> = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  F: 0.0,
}

interface ClassEntry {
  id: number
  name: string
  semester: string
  grade: string
  units: number
}

export default function App() {
  const [classes] = useState<ClassEntry[]>(initialClasses)

  const totalUnits = classes.reduce((sum, cls) => sum + cls.units, 0)

  const calculateGPA = () => {
    if (classes.length === 0) return 0

    const totalPoints = classes.reduce((sum, cls) => {
      const points = gradePoints[cls.grade] || 0
      return sum + points * cls.units
    }, 0)

    return totalPoints / totalUnits
  }

  const gpa = calculateGPA()

  // Get GPA color based on value
  const getGpaColor = (gpa: number) => {
    if (gpa >= 3.7) return "text-green-600 dark:text-green-500"
    if (gpa >= 3.0) return "text-emerald-600 dark:text-emerald-500"
    if (gpa >= 2.0) return "text-amber-600 dark:text-amber-500"
    return "text-red-600 dark:text-red-500"
  }

  // Get semester badge color
  const getSemesterColor = (semester: string) => {
    if (semester.includes("Fall"))
      return "bg-amber-100 text-amber-800 hover:bg-amber-100/80 dark:bg-amber-900/30 dark:text-amber-300"
    if (semester.includes("Spring"))
      return "bg-green-100 text-green-800 hover:bg-green-100/80 dark:bg-green-900/30 dark:text-green-300"
    if (semester.includes("Summer"))
      return "bg-blue-100 text-blue-800 hover:bg-blue-100/80 dark:bg-blue-900/30 dark:text-blue-300"
    return "bg-gray-100 text-gray-800 hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-300"
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <Card className="shadow-lg border-t-4 border-t-primary">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/80 pb-6">
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap className="h-6 w-6 text-primary" />
            <CardTitle className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Canvas Grade Calculator
            </CardTitle>
          </div>
          <CardDescription className="text-base text-slate-600 dark:text-slate-400">
            Track your academic progress and calculate your semester GPA
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="rounded-md border shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                <TableRow>
                  <TableHead className="w-[300px] font-semibold">Class Name</TableHead>
                  <TableHead className="font-semibold">Semester</TableHead>
                  <TableHead className="font-semibold">Grade</TableHead>
                  <TableHead className="text-right font-semibold">Units</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((cls) => (
                  <TableRow key={cls.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                    <TableCell className="font-medium">{cls.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getSemesterColor(cls.semester)}>
                        {cls.semester}
                      </Badge>
                    </TableCell>
                    <TableCell>{cls.grade}</TableCell>
                    <TableCell className="text-right">{cls.units}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Card className="mt-8 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/80 border-none shadow">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-slate-700 dark:text-slate-300">Academic Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col items-center justify-center p-5 border rounded-lg bg-white dark:bg-slate-900 shadow-sm">
                  <h3 className="text-lg font-medium text-slate-500 dark:text-slate-400 mb-1">Total Units</h3>
                  <p className="text-4xl font-bold text-slate-900 dark:text-white">{totalUnits}</p>
                </div>
                <div className="flex flex-col items-center justify-center p-5 border rounded-lg bg-white dark:bg-slate-900 shadow-sm">
                  <h3 className="text-lg font-medium text-slate-500 dark:text-slate-400 mb-1">Overall GPA</h3>
                  <p className={`text-4xl font-bold ${getGpaColor(gpa)}`}>{gpa.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}

