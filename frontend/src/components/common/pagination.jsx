import React, { Component } from "react";
import _ from "lodash";
import "./pagination.css";

class Pagination extends Component {
  render() {
    const { itemsCount, pageSize, onPageChange, currentPage } = this.props;
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);

    const renderClassName = (page) => {
      let { answers } = this.props;
      const hasAnswer = answers[page - 1];
      if (currentPage === page && hasAnswer) return "exam_no current";
      else if (hasAnswer) return "exam_no answered";
      else if (currentPage === page) return "exam_no current";
      else return "exam_no";
    };

    return (
      <div className="exam__pagination">
        <div className="exam__no-box">
          {pages.map((page) => (
            <span
              key={page}
              // className={currentPage === page ? "exam_no current" : "exam_no"}
              className={renderClassName(page)}
              onClick={() => onPageChange(page)}
            >
              {page}
            </span>
          ))}
        </div>
      </div>
    );
  }
}

export default Pagination;
