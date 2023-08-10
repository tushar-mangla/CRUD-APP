import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

import { Link } from "react-router-dom";

const PageBtnContainer = ({ currentPage, numOfPages, handlePageChange }) => {
  const renderPageButtons = () => {
    const pageButtons = [];

    for (let i = 1; i <= numOfPages; i++) {
      pageButtons.push(
        <Link
          key={i}
          to={`/dashboard/students/all?page=${i}`}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </Link>
      );
    }

    return pageButtons;
  };

  return (
    <>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = numOfPages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">{renderPageButtons()}</div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </>
  );
};

export default PageBtnContainer;
