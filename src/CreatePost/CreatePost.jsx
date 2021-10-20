import React, { useState, useContext } from "react";
import AuthContext from "../store/auth-context";
import { Link, useHistory } from "react-router-dom";
import Box from "../UI/Box";
import css from "./CreatePost.module.css";

const CreatePost = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [titleVal, setTitleVal] = useState("");
  const [contentVal, setContentVal] = useState("");
  const [categories, setCategories] = useState("");

  const changeTitleHandler = (event) => {
    setTitleVal(event.target.value);
  };
  const changeContentHandler = (event) => {
    setContentVal(event.target.value);
  };
  const changeCategoriesHandler = (event) => {
    setCategories(event.target.value);
  };

  const createPostHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://hack-ashp.herokuapp.com/api/posts", {
        method: "POST",
        body: JSON.stringify({
          "title": titleVal,
          "content": contentVal,
          "categories": categories.split(',').map(function (x) { 
            return parseInt(x, 10); 
          })
        }),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Bearer " + authCtx.token,
        },
      });
      

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      } else {
        history.push('/');
        console.log(data);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main className={css.Main}>
      <Box className={css.CreatePostBox}>
        <form onSubmit={createPostHandler}>
          <div className={css.FormPiece}>
            <label>Title:</label>
            <input
              type="text"
              className={css.TitleInput}
              onChange={changeTitleHandler}
              value={titleVal}
              className={css.Input}
            />
          </div>
          <div className={css.FormPiece}>
            <label>Content:</label>
            <textarea
              id="story"
              name="story"
              rows="5"
              cols="33"
              className={css.ContentInput}
              placeholder="Describe your question..."
              onChange={changeContentHandler}
              value={contentVal}
            ></textarea>
          </div>
          <div className={css.FormPiece}>
            <label>Categories:</label>
            <input
              type="text"
              className={css.CategoriesInput}
              onChange={changeCategoriesHandler}
              value={categories}
              className={css.Input}
            />
          </div>
          <div className={css.ButtonsDiv}>
            <button type="submit" className={css.Button}>
              Create Post
            </button>
            <Link to="/">
              <button className={`${css.Button} ${css.ButtonCancel}`}>
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </Box>
    </main>
  );
};

export default CreatePost;
