const mongoose = require("mongoose");
const Exam = require("../models/exam");
const exams = require("./exams");
const Course = require("../models/course");
const courses = require("./courses");

mongoose
  .connect("mongodb://localhost:27017/cbt", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log("Could not connect to mongodb... ", err));

async function seed() {
  await Exam.deleteMany();
  await Course.deleteMany();

  exams.forEach((e) => {
    const exam = new Exam({
      duration: e.duration,
      totalPoints: e.totalPoints,
      questionQty: e.questionQty,
      instruction: e.instruction,
      pointPerQuestion: e.pointPerQuestion,
      courseCode: e.courseCode,
      courseTitle: e.courseTitle,
      courseUnit: e.courseUnit,
      questions: e.questions,
    });
    exam.save();
  });

  courses.forEach((c) => {
    const course = new Course({
      courseCode: c.courseCode,
      courseTitle: c.courseTitle,
      level: c.level,
      students: c.students,
    });
    course.save();
  });

  console.log("Successfully written all files to the database");
}

seed();
