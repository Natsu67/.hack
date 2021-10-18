import React, { useState, useContext } from "react";
import AuthContext from "../store/auth-context";
import { Link, useHistory, Redirect } from "react-router-dom";
import Box from "../UI/Box";
import css from "./CreatePost.module.css";

const CreatePost = (props) => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const contentPlaceholderText = "Describe your question...";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState("");

  const changeTitleHandler = (event) => {
    setTitle(event.target.value);
  };
  const changeContentHandler = (event) => {
    setContent(event.target.value);
  };
  const changeCategoriesHandler = (event) => {
    setCategories(event.target.value);
  };

  const createPostHandler = async () => {
    try {
      const response = await fetch("http://hack-ashp.herokuapp.com/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          content: content,
          categories: categories.split(','),
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + authCtx.token,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      } else {
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
              value={title}
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
              placeholder={contentPlaceholderText}
              onChange={changeContentHandler}
              value={content}
            ></textarea>
          </div>
          <div className={css.FormPiece}>
            <label>Categories:</label>
            <input
              type="text"
              className={css.CategoriesInput}
              onChange={changeCategoriesHandler}
              value={categories}
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
