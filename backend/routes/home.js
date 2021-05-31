const express = require("express");
const Joi = require("Joi");
const Exam = require("../models/exam");
const Course = require("../models/course");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const courses = await Course.find({ level: req.body.level });
  console.log(courses);
  if (courses.length === 0)
    return res.status(404).send("No scheduled exam for your level yet");
  const course = await Course.findOne({ courseCode: req.body.courseCode });
  if (!course) return res.status(404).send("Course not found");
  const index = course.students.findIndex(
    (student) => student.idNumber === req.body.idNumber
  );
  if (index === -1)
    return res
      .status(404)
      .send("You are not registered for this course. Contact course lecturer");
  if (course.students[index].sat)
    return res.status(400).send("You have already sat for this paper");
  const exam = await Exam.findOne({ courseCode: req.body.courseCode });
  if (!exam) return res.status(404).send("Course not yet published for exams");
  res.send({ exam, course });
});

function validate(req) {
  const schema = Joi.object({
    idNumber: Joi.string()
      .min(9)
      .max(12)
      .regex(new RegExp("^[a-zA-Z]+[/-][0-9]+[a-zA-Z]*[/-][0-9]+$"))
      .required()
      .label("ID Number"),
    level: Joi.string().required().label("Level"),
    courseCode: Joi.string().required().label("Course Code"),
  });

  return schema.validate(req, { abortEarly: false });
}

module.exports = router;
