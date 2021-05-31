import React, { Component } from "react";
import "./qestions.css";

class Qestions extends Component {
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
                    {question.options.map((option) => (
                      <React.Fragment key={option}>
                        <label
                          htmlFor={option}
                          className={
                            option.toLowerCase() === currentAnswer
                              ? "exam__option-label active"
                              : "exam__option-label"
                          }
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
                    defaultValue={currentAnswer}
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
                >
                  {buttonLabel} &rarr;
                </button>
              </div>
            </div>
          </div>
        ))}
        {/* {question.options.map((option) => (
                  <div
                    key={option}
                    className={
                      currentAnswer === option.toLowerCase()
                        ? "exam__option active"
                        : "exam__option"
                    }
                    onClick={() => onAnswer(question, option)}
                  >
                    {option}
                  </div>
                  // <div className="exam__option">Data Structures</div>
                  // <div className="exam__option">Algorithm</div>
                  // <div className="exam__option">Dynamic Programming</div>
                ))} */}
      </React.Fragment>
    );
  }
}

export default Qestions;
