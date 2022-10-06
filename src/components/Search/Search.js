import React, { useEffect, useState } from "react";
import { searchPost } from "../../api/search/Search.api";
import { customAxios } from "../../lib/axios/customAxios";
import "../Search/Search.css";

const Search = () => {
  const [inputText, setInputText] = useState("");
  const [searchedPost, setSearchedPost] = useState([]);

  useEffect(() => {
    console.log(searchedPost);
  }, [searchedPost]);

  return (
    <input
      className="search"
      placeholder="카테고리 검색"
      value={inputText}
      onChange={(e) => {
        setInputText(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          // 검색 api 쏘기
          const data = searchPost(inputText);
          setSearchedPost(data);
        }
      }}
    />
  );
};

export default Search;
