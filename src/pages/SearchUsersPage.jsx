import React from "react";
import { useParams } from "react-router";
import SearchUsers from "../SearchUsers/SearchUsers";

const SearchUsersPage = (props) => {
  let { search_text } = useParams();
  return <SearchUsers search_text={search_text}/>;
};

export default SearchUsersPage;
