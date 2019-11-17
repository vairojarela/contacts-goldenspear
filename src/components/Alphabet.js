import React from "react";
import { Pagination } from "react-bootstrap";

const Alphabet = ({ handleButtonClick, letter }) => {
  const alphabet = "#abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
  return alphabet.map((x, index) => {
    return (
      <Pagination key={index}>
        <Pagination.Item
          active={x === letter}
          onClick={e => handleButtonClick(e)}
        >
          {x}
        </Pagination.Item>
      </Pagination>
    );
  });
};

export default Alphabet;
