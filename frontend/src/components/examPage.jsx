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
    correctAnswers: [],
    questions: [],
    exam: {},
  };

  async componentDidMount() {
    this.setTime();
    const { courseCode, idNumber } = this.props.match.params;
    console.log(courseCode, idNumber);
    const { data: exam } = await http.get(
      `${config.apiEndpoint}/exam/${courseCode}/${idNumber}`
    );
    const questions = shuffle(exam.questions, 20);
    this.setState({ questions, exam });
  }

  CountDown() {
    if (this.state.examTime === 1000) {
      // localStorage.setItem("Time", "Timed Up")
      this.handleTimeOut();
    } else if (this.state.examTime > 0) {
      let countDown = this.state.examTime - 1000;
      // localStorage.setItem("Time", JSON.stringify(countDown));
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
    const examTime =
      Date.parse(new Date()) + 1000 * 60 * 30 - Date.parse(new Date());
    this.setState({ examTime });
    this.timer = setInterval(() => this.CountDown(), 1000);
    this.remainingTime();
  };

  handleTimeOut = () => {
    clearInterval(this.timer);
    this.setState({
      timeOut: true,
    });
  };

  handlePageChange = (page) => {
    const { questions } = this.state;
    this.setState({ currentPage: page });
    if (page === questions.length) {
      this.setState({ buttonLabel: "Submit" });
    } else {
      this.setState({ buttonLabel: "Next" });
    }
  };

  submit = async () => {
    const { courseCode, idNumber } = this.props.match.params;
    const payload = { score: this.state.points };
    await http.post(
      `${config.apiEndpoint}/exam/score/${courseCode}/${idNumber}`,
      payload
    );
    this.props.history.push("/");
  };

  handleNextAndSubmit = () => {
    // handles both next qestion action and submit exam action
    const { currentPage, questions, correctAnswers } = this.state;
    const totalPoints = correctAnswers.length * 2;
    this.setState({ points: totalPoints });
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

    let clonedCorrectAnswers = [...this.state.correctAnswers];
    const index = clonedCorrectAnswers.indexOf(correctAnswer);
    if (correctAnswer === answer) {
      if (index === -1) {
        console.log(clonedCorrectAnswers);
        clonedCorrectAnswers = [...clonedCorrectAnswers, answer];
        return this.setState({ correctAnswers: clonedCorrectAnswers });
      }
    }
    if (index >= 0) {
      clonedCorrectAnswers.splice(index, 1);
      this.setState({ correctAnswers: clonedCorrectAnswers });
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
      timeOut,
    } = this.state;
    const questions = paginate(allQuestions, currentPage, pageSize);
    if (timeOut) {
      this.submit();
    }
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
            onAnswer={this.handleAnswer}
            onNextAndSubmit={this.handleNextAndSubmit}
          />

          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default ExamPage;
