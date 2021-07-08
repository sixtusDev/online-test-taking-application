import React, { Component } from "react";
import "./qestions.css";

class Qestions extends Component {
  renderClassName = (option, index) => {
    const { currentPage, answers } = this.props;
    const hasCommon = answers[currentPage - 1] === option;
    if (hasCommon) return "exam__option-label active";
    else return "exam__option-label";
  };
  render() {
    const { questions, currentAnswer, buttonLabel, onAnswer, onNextAndSubmit } =
      this.props;
    return (
      <React.Fragment>
        {questions.map((question) => (
          <div className="exam__question-container" key={question.id}>
            <div className="exam__question">
              <div className="exam__question-no">Question</div>
              <div className="exam__question-text-box">
                <p className="exam__qestion-text">{question.question}</p>
              </div>
            </div>
            <div className="exam__options">
              {question.questionType === "objective" ? (
                <React.Fragment>
                  <div className="exam__question-no">Options</div>
                  <div className="exam__options-box">
                    {question.options.map((option, index) => (
                      <React.Fragment key={option}>
                        <label
                          htmlFor={option}
                          // className={
                          //   option.toLowerCase() === currentAnswer
                          //     ? "exam__option-label active"
                          //     : "exam__option-label"
                          // }
                          className={this.renderClassName(option, index)}
                        >
                          {option}
                        </label>
                        <input
                          className="exam__option"
                          id={option}
                          type="radio"
                          name="option"
                          value={option.toLowerCase()}
                          onChange={(event) => onAnswer(question, event)}
                        />
                      </React.Fragment>
                    ))}
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="exam__question-no">Type Answer Below</div>
                  <textarea
                    value={currentAnswer}
                    className="exam__options-box text-area"
                    name="answerbox"
                    id="answerbox"
                    cols="30"
                    rows="10"
                    placeholder="Enter your answer here"
                    onChange={(event) => onAnswer(question, event)}
                  ></textarea>
                </React.Fragment>
              )}

              <div>
                <button
                  className="btn-next-submit"
                  onClick={() => onNextAndSubmit()}
                  onKeyDown={this.handleKeyDown}
                >
                  {buttonLabel} &rarr;
                </button>
              </div>
            </div>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default Qestions;
