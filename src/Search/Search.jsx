import React, {useState, useEffect} from "react";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import css from "./Search.module.css";

const Search = (props) => {
    const [search, setSearch] = useState("");

    useEffect (()=>{
        if(props.search_text) {
            setSearch(props.search_text);
        }
    }, []);

    const searchChangeHandler = (event) => {
        setSearch(event.target.value);
    }
    
const link = `${props.searchUrl}/${search}`;

    return (
        <form className={css.searchContainer}>
            <input type="text" placeholder="Search.." name="search" className={css.SearchField} onChange={searchChangeHandler} value={search}/>
            <Link to={link} className={css.Link}><button type="submit"><Icon.Search color='white'/></button></Link>
        </form>
    );
}

export default Search;