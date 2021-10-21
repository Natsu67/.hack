import React from "react";
import { useParams } from "react-router";
import SearchPosts from "../SearchPosts/SearchPosts";

const SearchPostsPage = (props) => {
  let { search_text } = useParams();
  return <SearchPosts search_text={search_text}/>;
};

export default SearchPostsPage;
