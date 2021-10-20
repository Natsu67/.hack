import React, { useState, useContext, useEffect, useCallback } from "react";
import Box from "../../UI/Box";
import * as Icon from "react-bootstrap-icons";
import css from "./BigPost.module.css";
import AuthContext from "../../store/auth-context";
import { Link } from "react-router-dom";

const BigPost = (props) => {
  const authCtx = useContext(AuthContext);

  const postLikeHandler = async (type) => {
    try {
      const response = await fetch(
        `http://hack-ashp.herokuapp.com/api/posts/${props.id}/like`,
        {
          method: "POST",
          body: JSON.stringify({
            type: type,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + authCtx.token,
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      } else {
        props.onPostLike();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={css.Wrapper}>
      <Box className={css.BigPost}>
        <div className={css.PostMark}>
          <Icon.ChevronUp
            className={css.MarkButton}
            onClick={() => postLikeHandler("like")}
          />
          <span className={css.Rating}>{props.rating}</span>
          <Icon.ChevronDown
            className={css.MarkButton}
            onClick={() => postLikeHandler("dislike")}
          />
        </div>
        <div className={css.PostMain}>
          <div>
            <label className={css.PostTitle}>
              Nisi quis eleifend quam adipiscing vitae proin sagittis nisl.
              {props.title}
            </label>
            <div className={css.CategoriesAndUser}>
              {props.categories &&
                props.categories.map((Category) => {
                  return (
                    <Link
                      to={`/category/${Category.category_id}/${Category.category_name}`}
                      key={Category.category_id}
                      className={css.Link}
                    >
                      #{Category.category_name}
                    </Link>
                  );
                })}
              <img src={props.user_avatar_url} className={css.PersonAvatar} />
              <Link to={`/user/${props.user_id}`} className={css.Link}>
                {props.user_login}
              </Link>
            </div>
            <div className={css.PostContent}>
              <span className={css.PostContentText}>
                {props.content}Tristique nulla aliquet enim tortor at auctor.
                Nisi quis eleifend quam adipiscing vitae proin sagittis nisl.
                Fermentum dui faucibus in ornare quam viverra orci sagittis. Id
                neque aliquam vestibulum morbi blandit. Senectus et netus et
                malesuada fames ac turpis egestas. Amet dictum sit amet justo
                donec enim diam vulputate ut. Nulla facilisi cras fermentum odio
                eu feugiat pretium nibh ipsum. Massa ultricies mi quis hendrerit
                dolor magna eget est lorem.Tristique nulla aliquet enim tortor
                at auctor. Nisi quis eleifend quam adipiscing vitae proin
                sagittis nisl. Fermentum dui faucibus in ornare quam viverra
                orci sagittis.
              </span>
            </div>
          </div>
          <div>
            <div className={css.PostDate}>
              <span>{new Date(props.updated_at).toUTCString()}</span>
            </div>
          </div>
        </div>
      </Box>
      {(authCtx.role === "admin" || authCtx.userId === props.user_id) && (
        <div className={css.ButtonsDiv}>
          <button className={css.Button}>Edit Post</button>
          <button className={`${css.Button} ${css.ButtonDeletePost}`}>
            Delete Post
          </button>
        </div>
      )}
    </div>
  );
};

export default BigPost;
