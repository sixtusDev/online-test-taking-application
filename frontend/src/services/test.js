import registeredStudents from "./students.js";

const result = [];
registeredStudents.forEach((s) => result.push(s.courseCode));
console.log(result);
