import React, { useState, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

function Pagination({ showPerPage, total, onPaginationChange }) {
  const [counter, setCounter] = useState(1);
  const numOfBtns = Math.ceil(total / showPerPage);

  useEffect(() => {
    const value = showPerPage * counter;
    onPaginationChange(value - showPerPage, value);
  }, [counter]);

  const pageNumber = [];
  for (let i = 0; i <= numOfBtns; i++) {
    pageNumber.push(i);
  }

  const onBtnClick = (type) => {
    if (type === "pervious") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (numOfBtns === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };

  return (
    <div className="arrow">
      <div onClick={() => onBtnClick("pervious")}>
        <svg
          width="15"
          height="20"
          viewBox="0 0 9 15"
          xmlns="http://www3.org/2000/svg"
        />
        <IoIosArrowBack className="backArrow" />
      </div>
      {pageNumber.map((page, idx) => {
        return (
          <span key={idx} className={counter === idx + 1 ? "blue" : "white"}>
            {page}
          </span>
        );
      })}

      <div onClick={() => onBtnClick("next")}>
        <svg
          width="15"
          height="20"
          viewBox="0 0 10 15"
          xmlns="http://www3.org/2000/svg"
        />
        <IoIosArrowForward className="backArrow" />
      </div>
    </div>
  );
}

export default Pagination;
