const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseCode: String,
  courseTitle: String,
  level: String,
  students: [
    {
      idNumber: String,
      score: {
        type: Number,
        default: null,
      },
      sat: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
