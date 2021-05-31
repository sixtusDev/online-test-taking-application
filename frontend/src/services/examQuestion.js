import { v4 as uuidv4 } from "uuid";
import { shuffle } from "../utils/helperFunctions";

const examQestions = [
  {
    duration: "30:00",
    totalPoints: 16,
    instruction:
      "Your are required to attemp every question, avoid examination malpractice. Each question caries 2 marks.",
    courseCode: "CSC511",
    courseTitle: "Design and Analysis of Algorithm",
    courseUnit: 3,
    questions: [
      {
        id: uuidv4(),
        question: "Which of the following uses FIFO method",
        options: ["Stack", "Queue", "Hash Table", "Binary Search Tree"],
        answer: "Queue",
        questionType: "objective",
      },
      {
        id: uuidv4(),
        question: "A linked-list is a dynamic structure",
        options: ["true", "false"],
        answer: "true",
        questionType: "objective",
      },
      {
        id: uuidv4(),
        question:
          "What is the space complexity of a linear queue having n elements?",
        answer: "O(n)",
        questionType: "subjective",
      },
      {
        id: uuidv4(),
        question:
          "Maximum degree of any vertex in a simple graph of vrtices n is",
        options: ["2n - 1", "n", "n + 1", "n - 1"],
        answer: "n - 1",
        questionType: "objective",
      },
      {
        id: uuidv4(),
        question: "What is the time complexity of enqueue operation?",
        answer: "O(1)",
        questionType: "subjective",
      },
      {
        id: uuidv4(),
        question: "Which of the below given series is non-increasing?",
        options: ["1,3,4,6,8,9", "9,8,6,4,3,1", "9,8,6,3,3,1", "1,3,3,6,8,9"],
        answer: "9,8,6,3,3,1",
        questionType: "objective",
      },
      {
        id: uuidv4(),
        question: "In context with time-complexity, find the odd out",
        options: [
          "Deletion from linked list",
          "Searching in hash table",
          "Adding edge in ajacency matrix",
          "heapify a binary heap",
        ],
        answer: "heapify a binary heap",
        questionType: "objective",
      },
      {
        id: uuidv4(),
        question:
          "If queue is implemented using arrays, what would be the worst run time complexity of queue and dequeue operations",
        options: ["O(n), O(n)", "O(n), O(1)", "O(1), O(n)", "O(1), O(1)"],
        answer: "O(1), (1)",
        questionType: "objective",
      },
      {
        id: uuidv4(),
        question: "Tower of hanoi is a classic example of",
        options: [
          "Divide and conquer",
          "Decursive approach",
          "B but not A",
          "Both A & B",
        ],
        answer: "Both A & B",
        questionType: "objective",
      },
      {
        id: uuidv4(),
        question:
          "Aposterior analysis are more accurate than apriori analysis because",
        options: [
          "It contains the real data",
          "It assumes all other factors to be dynamic",
          "It assumes all other factors to be constant",
          "It is a result of reverse-engineering",
        ],
        answer: "It assumes all other factors to be dynamic",
        questionType: "objective",
      },

      {
        id: uuidv4(),
        question:
          "In general, the index of the first element in an array is __________",
        answer: "0",
        questionType: "subjective",
      },
      {
        id: uuidv4(),
        question: "Elements in an array are accessed _________",
        answer: "randomly",
        questionType: "subjective",
      },
    ],
  },
];

export function getExamQuestion(courseCode) {
  return examQestions.find((exam) => exam.courseCode === courseCode);
}

export function getQestions(courseCode) {
  const result = examQestions.find((exam) => exam.courseCode === courseCode);
  return shuffle(result.questions, 5);
}

export default examQestions;
