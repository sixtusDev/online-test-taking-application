const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  duration: Number,
  totalPoints: Number,
  questionQty: Number,
  instruction: {
    type: String,
    lowercase: true,
  },
  pointPerQuestion: Number,
  courseCode: {
    type: String,
    lowercase: true,
  },
  courseTitle: {
    type: String,
    lowercase: true,
  },
  courseUnit: Number,
  questions: [
    {
      question: {
        type: String,
        lowercase: true,
      },
      options: [
        {
          type: String,
          lowercase: true,
        },
      ],
      answer: {
        type: String,
        lowercase: true,
      },
      questionType: {
        type: String,
        lowercase: true,
      },
    },
  ],
});

const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam;
