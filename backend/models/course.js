const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    lowercase: true,
  },
  courseTitle: {
    type: String,
    lowercase: true,
  },
  level: {
    type: String,
    lowercase: true,
  },
  students: [
    {
      idNumber: {
        type: String,
        lowercase: true,
      },
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
