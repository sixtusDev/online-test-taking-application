const express = require("express");
const Exam = require("../models/exam");
const Course = require("../models/course");

const router = express.Router();

router.get("/:courseCode/:idNumber", async (req, res, next) => {
  const { courseCode, idNumber } = req.params;
  const exam = await Exam.findOne({ courseCode });
  const course = await Course.findOne({ courseCode });
  if (!exam && !course)
    return res
      .status(404)
      .send("Exam for the given course code not yet published");
  const index = course.students.findIndex(
    (student) => student.idNumber === idNumber
  );
  if (index === -1)
    return res
      .status(404)
      .send(
        "Not registered for this course please contact your course lecturer"
      );
  res.send(exam);
});

router.post("/score/:courseCode/:idNumber", async (req, res) => {
  const { courseCode, idNumber } = req.params;
  const course = await Course.findOne({ courseCode });
  if (!course) return res.status(404).send("Course not found");
  const student = course.students.find(
    (student) => student.idNumber === idNumber
  );
  if (!student)
    return res
      .status(404)
      .send("Student with the given ID is not registered for this course");
  student.score = req.body.score;
  student.sat = true;
  await course.save();
  res.send(student);
});

module.exports = router;
