import React, { Component } from "react";
import { confirmSubmit } from "../../utils/helperFunctions";
import "./header.css";

class Header extends Component {
  onSubmit = () => {
    confirmSubmit(
      "Confirm Submit Exam",
      "Are you sure you want to submit?",
      this.props.submit
    );
  };
  render() {
    const { courseCode, timeLeft } = this.props;
    return (
      <div className="exam__header">
        <h2 className="exam__course-code">{courseCode}</h2>
        <h2 className="exam__time">{timeLeft}</h2>
        <button className="btn-primary" onClick={this.onSubmit}>
          Submit
        </button>
      </div>
    );
  }
}

export default Header;
