import React from "react";
import * as Icon from "react-bootstrap-icons";
import css from "./Search.module.css";

const Search = (props) => {
    return (
        <form className={css.searchContainer}>
            <input type="text" placeholder="Search.." name="search" className={css.SearchField}/>
            <button type="submit"><Icon.Search color='white'/></button>
        </form>
    );
}

export default Search;