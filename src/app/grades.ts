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

export const numberToLetter = (number: number) => {
  for (const item of gradeTable) {
    if (number >= item.number) {
      return item.letter;
    }
  }
};

export const numberToGPA = (number: number) => {
  for (const item of gradeTable) {
    if (number >= item.number) {
      return item.gpa;
    }
  }
};
