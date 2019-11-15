import React from "react";

const SearchInput = ({ placeholder, handleChange }) => {
  return (
    <input placeholder={placeholder} onChange={() => handleChange()}></input>
  );
};

export default SearchInput;
