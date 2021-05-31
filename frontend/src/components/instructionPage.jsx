import React, { Component } from "react";
import { confirmSubmit } from "../utils/helperFunctions";
import http from "../services/httpService";
import config from "../config.json";
import "./instructionPage.css";
import "react-confirm-alert/src/react-confirm-alert.css";

class InstructionPage extends Component {
  state = {
    exam: [],
  };

  async componentDidMount() {
    const { courseCode, idNumber } = this.props.match.params;
    const { data: exam } = await http.get(
      `${config.apiEndpoint}/exam/${courseCode}/${idNumber}`
    );
    this.setState({ exam });
  }

  startExam = () => {
    this.props.history.push(
      `/exam/${this.props.match.params.courseCode}/${this.props.match.params.idNumber}`
    );
  };

  handleStart = () => {
    confirmSubmit(
      "Confirm Start Exam",
      "Are you sure you want to start this exam",
      this.startExam
    );
  };

  render() {
    const { exam } = this.state;
    return (
      <div className="container">
        <div className="course">
          <div style={{ textAlign: "center" }}>
            <img
              src="../../mau.png"
              alt="mautch logo"
              className="course__school-logo"
            />
          </div>
          <h2 className="course__title">Course title: {exam.courseTitle}</h2>
          <h2 className="course__code">Course Code: {exam.courseCode}</h2>
          <h2 className="course__unit">Course Unit: {exam.courseUnit}</h2>
          <div className="course__instruction-box">
            <h2 className="course__instruction-heading">instruction</h2>
            <p className="course__instruction-text">{exam.instruction}</p>
          </div>
          <div className="course__goodwill-container">
            <button className="btn-start" onClick={this.handleStart}>
              Start &rarr;
            </button>
            <p className="course__goodwill">Good Luck!</p>
          </div>
        </div>
      </div>
    );
  }
}

export default InstructionPage;
