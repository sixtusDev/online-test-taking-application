const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  duration: Number,
  totalPoints: Number,
  instruction: String,
  pointPerQuestion: Number,
  courseCode: String,
  courseTitle: String,
  courseUnit: Number,
  questions: [
    {
      question: String,
      options: [String],
      answer: String,
      questionType: String,
    },
  ],
});

const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam;
