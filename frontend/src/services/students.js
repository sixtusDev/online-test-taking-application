const registeredStudents = [
  {
    courseCode: "CSC511",
    courseTitle: "Design and Analysis of Algorithm",
    level: "500",
    students: [
      { idNumber: "csc-15u-3338", score: null },
      { idNumber: "csc-15u-3234", score: null },
      { idNumber: "csc-15u-2834", score: null },
      { idNumber: "csc-15u-4534", score: null },
      { idNumber: "csc-15u-3323", score: null },
      { idNumber: "csc-15u-2896", score: null },
      { idNumber: "csc-15u-3234", score: null },
      { idNumber: "csc-15u-3339", score: null },
      { idNumber: "csc-15u-3233", score: null },
      { idNumber: "csc-15u-3243", score: null },
      { idNumber: "csc-15u-4434", score: null },
      { idNumber: "csc-15u-2287", score: null },
      { idNumber: "csc-15u-2789", score: null },
      { idNumber: "csc-15u-3456", score: null },
      { idNumber: "csc-15u-3356", score: null },
    ],
  },
  {
    courseCode: "CSC503",
    courseTitle: "Software Engineering",
    level: "500",
    students: [
      { idNumber: "csc-15u-3234", score: null },
      { idNumber: "csc-15u-3338", score: null },
      { idNumber: "csc-15u-2834", score: null },
      { idNumber: "csc-15u-4534", score: null },
      { idNumber: "csc-15u-3323", score: null },
      { idNumber: "csc-15u-2896", score: null },
      { idNumber: "csc-15u-3234", score: null },
      { idNumber: "csc-15u-3339", score: null },
      { idNumber: "csc-15u-3233", score: null },
      { idNumber: "csc-15u-3243", score: null },
      { idNumber: "csc-15u-4434", score: null },
      { idNumber: "csc-15u-2287", score: null },
      { idNumber: "csc-15u-2789", score: null },
      { idNumber: "csc-15u-3456", score: null },
      { idNumber: "csc-15u-3356", score: null },
    ],
  },
];

export function getStudent(courseCode, idNumber) {
  const course = registeredStudents.find((c) => c.courseCode === courseCode);
  return course.students.find((student) => student.idNumber === idNumber);
}

export function postScore(courseCode, idNumber, score) {
  const student = getStudent(courseCode, idNumber);
  student.score = score;

  console.log(student);
}

export default registeredStudents;
