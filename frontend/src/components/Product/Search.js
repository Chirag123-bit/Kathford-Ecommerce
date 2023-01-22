import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./search.css";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  function onSubmit() {}

  function setKeyWord() {}

  const searchHandle = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };
  return (
    <>
      <form className="searchBox" onSubmit={searchHandle}>
        <input
          type="text"
          placeholder="Enter a text"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default Search;
