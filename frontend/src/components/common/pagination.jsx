import React, { Component } from "react";
import _ from "lodash";
import "./pagination.css";

class Pagination extends Component {
  state = {
    answered: false,
  };

  render() {
    const { itemsCount, pageSize, onPageChange, currentPage } = this.props;
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);

    return (
      <div className="exam__pagination">
        <div className="exam__no-box">
          {pages.map((page) => (
            <span
              key={page}
              className={currentPage === page ? "exam_no current" : "exam_no"}
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
