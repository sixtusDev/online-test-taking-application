const exams = [
  {
    duration: 30,
    totalPoints: 50,
    questionQty: 20,
    pointPerQuestion: 2,
    instruction:
      "Your are required to attemp every question, avoid examination malpractice. Each question caries 2 marks.",
    courseCode: "CSC511",
    courseTitle: "Design and Analysis of Algorithm",
    courseUnit: 3,
    questions: [
      {
        question: "Which of the following uses FIFO method",
        options: ["Stack", "Queue", "Hash Table", "Binary Search Tree"],
        answer: "Queue",
        questionType: "objective",
      },
      {
        question: "A linked-list is a dynamic structure",
        options: ["true", "false"],
        answer: "true",
        questionType: "objective",
      },
      {
        question:
          "What is the space complexity of a linear queue having n elements?",
        answer: "O(n)",
        questionType: "subjective",
      },
      {
        question:
          "Maximum degree of any vertex in a simple graph of vrtices n is",
        options: ["2n - 1", "n", "n + 1", "n - 1"],
        answer: "n - 1",
        questionType: "objective",
      },
      {
        question: "What is the time complexity of enqueue operation?",
        answer: "O(1)",
        questionType: "subjective",
      },
      {
        question: "Which of the below given series is non-increasing?",
        options: ["1,3,4,6,8,9", "9,8,6,4,3,1", "9,8,6,3,3,1", "1,3,3,6,8,9"],
        answer: "9,8,6,3,3,1",
        questionType: "objective",
      },
      {
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
        question:
          "If queue is implemented using arrays, what would be the worst run time complexity of queue and dequeue operations",
        options: ["O(n), O(n)", "O(n), O(1)", "O(1), O(n)", "O(1), O(1)"],
        answer: "O(1), (1)",
        questionType: "objective",
      },
      {
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
        question:
          "In general, the index of the first element in an array is __________",
        answer: "0",
        questionType: "subjective",
      },
      {
        question: "Elements in an array are accessed _________",
        answer: "randomly",
        questionType: "subjective",
      },
      {
        question: "How can we describe an array in the best possible way?",
        options: [
          "The array shows a heirarchical structure",
          "Arrays are immutable",
          "Container that stores the elements of similar types",
          "The Array is not a data structure",
        ],
        answer: "Container that stores the elements of similar types",
        questionType: "objective",
      },
      {
        question:
          "Which of the following is the advantage of array data structure?",
        options: [
          "Elements of mixed data types can be stored",
          "Easier to access the elements in an array",
          "Index of the first element starts from 1",
          "Elements of an array cannot be stored",
        ],
        answer: "Easier to access the elements in an array",
        questionType: "objective",
      },
      {
        question: "Which of the following highly uses the concept of an array?",
        options: [
          "Binary Search Tree",
          "Caching",
          "Spatial locality",
          "Scheduling of processes",
        ],
        answer: "Spacial locality",
        questionType: "objective",
      },
      {
        question:
          "Which one of the following is the size of int[9] assuming that int is of 4 bytes?",
        options: ["9", "36", "35", "None of the above"],
        answer: "36",
        questionType: "objective",
      },
      {
        question:
          "Which one of the following is the process of inserting an element in the stack?",
        options: ["Insert", "Push", "Add", "None of the above"],
        answer: "Push",
        questionType: "objective",
      },
      {
        question:
          "Whwn the user tries to delete the element from the empty stack then the condition is said to be a __________",
        options: [
          "Underflow",
          "Garbage collection",
          "Overflow",
          "None of the above",
        ],
        answer: "Underflow",
        questionType: "objective",
      },
      {
        question:
          "Which of the following is not the application of the stack data structure?",
        options: [
          "String reversal",
          "Recursion",
          "Backtracking",
          "Asynchronous data transfer",
        ],
        answer: "Asynchronous data transfer",
        questionType: "objective",
      },
      {
        question:
          "Which data structure is mainly used for implementing the recursive algorithm?",
        answer: "Stack",
        questionType: "subjective",
      },
      {
        question:
          "If the elements 1, 2, 3, and 4 are added in a stack, so what would be the order for the removal",
        options: ["1234", "2134", "4321", "None of the above"],
        answer: "4321",
        questionType: "objective",
      },
      {
        question:
          "The minimum number opf stacks required to implement a stack is __________",
        options: ["1", "2", "3", "5"],
        answer: "2",
        questionType: "objective",
      },
      {
        question:
          "If the elements 1,2,3, and 4 are inserted in a queue, what would be the order for the removal?",
        answer: "1234",
        questionType: "subjective",
      },
      {
        question:
          "A list of elements in which enqueue operation takes place from one end, and dequeue operation takes place from one end is __________",
        answer: "Queue",
        questionType: "subjective",
      },
      {
        question: "Queue uses __________ principle",
        answer: "LIFO",
        questionType: "subjective",
      },
      {
        question:
          "The time complexity of enqueue operation in Queue is ___________",
        answer: "O(1)",
        questionType: "subjective",
      },
      {
        question:
          "The necessary condition to be checked before deletion from the queue is __________",
        options: ["Overflow", "Underflow", "Rear value", "Fron value"],
        answer: "Underflow",
        questionType: "objective",
      },
      {
        question:
          "Which data structure is the best for implementing a priority queue?",
        options: ["Stack", "Linked List", "Array", "Heap"],
        answer: "Heap",
        questionType: "objective",
      },
      {
        question:
          "Which of the following principle is used if two elements in the priority queue have thesame priority",
        options: ["LIFO", "FIFO", "Linear tree", "None of the above"],
        answer: "FIFO",
        questionType: "objective",
      },
      {
        question:
          "A linear data structure in which insertion and deletion operations can bbe performed from both ends is __________",
        options: ["Queue", "Deque", "Priority queue", "Circular queue"],
        answer: "Deque",
        questionType: "objective",
      },
      {
        question:
          "Which of the following is the time complexity to search an element in the linked list?",
        options: ["O(1)", "O(n)", "O(logn)", "O(nlogn)"],
        answer: "O(n)",
        questionType: "objective",
      },
      {
        question:
          "The maximum number of children that a node can have in a binary tree is __________",
        answer: "2",
        questionType: "subjective",
      },
      {
        question:
          "The binary search tree whose left subtree and right subtree differ in height by at most 1 unit is called __________",
        answer: "AVL",
        questionType: "subjective",
      },
      {
        question:
          "__________ level is where the model becomes compatible executable code",
        options: [
          "Abstract level",
          "Application level",
          "Implementation level",
          "All of the above",
        ],
        answer: "Implemtation level",
        questionType: "objective",
      },
      {
        question:
          "Inserting an item into the stack when stack is not full is called __________ operation and deletion of item from the stack when stack is not empty is called __________ operation",
        answer: "push pop",
        questionType: "subjective",
      },
    ],
  },
];

module.exports = exams;
