// Import Statements
import React, { Component } from "react";
import { shuffle, confirmSubmit } from "../utils/helperFunctions";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import Header from "./common/header";
import Questions from "./qestions";
import http from "../services/httpService";
import config from "../config.json";
import "./examPage.css";

class ExamPage extends Component {
  state = {
    pageSize: 1,
    currentPage: 1,
    buttonLabel: "Next",
    examTime: undefined,
    timeOut: false,
    points: 0,
    currentAnswer: "",
    correctAnswers: {},
    answers: {},
    questions: [],
    exam: {},
  };

  async componentDidMount() {
    const examData = JSON.parse(localStorage.getItem("exam"));
    if (examData) {
      this.setTime();
      return this.setState({ questions: examData.questions, exam: examData });
    }
    const { courseCode, idNumber } = this.props.match.params;
    const { data: exam } = await http.get(
      `${config.apiEndpoint}/exam/${courseCode}/${idNumber}`
    );
    const questions = shuffle(exam.questions, exam.questionQty);
    exam.questions = questions;
    localStorage.setItem("exam", JSON.stringify(exam));
    this.setState({
      questions,
      exam,
    });
    this.setTime();
  }

  componentDidUpdate() {
    if (this.state.timeOut) {
    }
  }

  CountDown() {
    if (this.state.examTime === 1000) {
      // localStorage.setItem("exam-time", "Timed Up");
      localStorage.removeItem("exam-time");
      this.submit();
      this.handleTimeOut();
    } else if (this.state.examTime > 0) {
      let countDown = this.state.examTime - 1000;

      localStorage.setItem("exam-time", JSON.stringify(countDown));
      this.setState({ examTime: countDown });
    }
  }

  leadingZero(num) {
    if (num < 10) {
      return "0" + num;
    }

    return num;
  }

  remainingTime() {
    let seconds = this.leadingZero(
      Math.floor((this.state.examTime / 1000) % 60)
    );
    let minutes = this.leadingZero(
      Math.floor((this.state.examTime / 1000 / 60) % 60)
    );

    return `${minutes}:${seconds}`;
  }

  setTime = () => {
    const { duration } = this.state.exam;
    let examTime = JSON.parse(localStorage.getItem("exam-time"));
    if (!examTime)
      examTime =
        Date.parse(new Date()) +
        1000 * 60 * parseInt(duration) -
        Date.parse(new Date());
    this.setState({ examTime });
    this.timer = setInterval(() => this.CountDown(), 1000);
    this.remainingTime();
  };

  handleTimeOut = () => {
    clearInterval(this.timer);
    this.setState({
      timeOut: true,
      examTime: null,
    });
  };

  handlePageChange = (page) => {
    const { questions } = this.state;
    this.setState({ currentPage: page, currentAnswer: "" });
    if (page === questions.length) {
      this.setState({ buttonLabel: "Submit" });
    } else {
      this.setState({ buttonLabel: "Next" });
    }
  };

  submit = async () => {
    const { courseCode, idNumber } = this.props.match.params;
    const { correctAnswers, exam } = this.state;
    const score = Object.keys(correctAnswers).length * exam.pointPerQuestion;
    const payload = { score };
    this.handleTimeOut();
    localStorage.removeItem("exam-time");
    localStorage.removeItem("exam");

    await http.post(
      `${config.apiEndpoint}/exam/score/${courseCode}/${idNumber}`,
      payload
    );
    this.props.history.push("/");
  };

  handleNextAndSubmit = () => {
    // handles both next qestion action and submit exam action
    const { currentPage, questions } = this.state;
    if (currentPage === questions.length) {
      return confirmSubmit(
        "Confirm Submit Exam",
        "Are you sure you want to submit?",
        this.submit
      );
    }

    if (currentPage === questions.length - 1)
      // Sets the button label to "Submit" when we are at the last page of the question
      this.setState({ buttonLabel: "Submit" });

    let currentPageClone = currentPage;
    currentPageClone++;
    this.setState({ currentPage: currentPageClone, currentAnswer: "" });
  };

  handleAnswer = async (question, event) => {
    const answer = event.target.value.toLowerCase();
    const correctAnswer = question.answer.toLowerCase();
    await this.setState({ currentAnswer: answer });

    let clonedCorrectAnswers = { ...this.state.correctAnswers };
    let clonedAnswers = { ...this.state.answers };
    clonedAnswers[this.state.currentPage - 1] = answer;
    this.setState({ answers: clonedAnswers });
    // const index = clonedCorrectAnswers.indexOf(correctAnswer);
    if (correctAnswer === answer) {
      clonedCorrectAnswers[this.state.currentPage - 1] = answer;
      return this.setState({ correctAnswers: clonedCorrectAnswers });
    } else {
      delete clonedCorrectAnswers[this.state.currentPage - 1];
    }
  };

  render() {
    const { length: count } = this.state.questions;
    const {
      currentPage,
      pageSize,
      questions: allQuestions,
      exam,
      buttonLabel,
      currentAnswer,
      answers,
    } = this.state;
    const questions = paginate(allQuestions, currentPage, pageSize);
    return (
      <div className="exam">
        <Header
          courseCode={exam.courseCode}
          timeLeft={this.remainingTime()}
          submit={this.submit}
        />
        <div className="exam__body">
          <Questions
            questions={questions}
            buttonLabel={buttonLabel}
            currentAnswer={currentAnswer}
            answers={answers}
            currentPage={currentPage}
            onAnswer={this.handleAnswer}
            onNextAndSubmit={this.handleNextAndSubmit}
          />

          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            answers={answers}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default ExamPage;
