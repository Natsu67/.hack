import React, { useState, useContext, useEffect, useCallback } from "react";
import Loader from "react-loader-spinner";
import AuthContext from "../store/auth-context";
import BigPost from "./BigPost/BigPost";
import CommentCard from "./CommentCard/CommentCard";
import { useHistory } from "react-router";

import css from "./SinglePost.module.css";

const SinglePost = (props) => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const [postData, setPostData] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPostHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://hack-ashp.herokuapp.com/api/posts/${props.id}`,
        {
          method: "GET",
          headers: authCtx.isLoggedIn
            ? {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + authCtx.token,
              }
            : {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      setPostData(data);
    } catch (error) {

      setError(error.message);
    }
    setIsLoading(false);
  }, [props.id]);

  const fetchPostCommentsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://hack-ashp.herokuapp.com/api/posts/${props.id}/comments`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      setPostComments(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [props.id]);

  const deletePostHandler = async () => {
    try {
      const response = await fetch(
        `http://hack-ashp.herokuapp.com/api/posts/${props.id}`,
        {
          method: "DELETE",
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
        alert("Post is deleted");
        history.replace('/');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const editPostHandler = async (newData) => {
    try {
      const response = await fetch(
        `http://hack-ashp.herokuapp.com/api/posts/${props.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(newData),
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
        fetchPostHandler();
      }
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    fetchPostHandler();
  }, [fetchPostHandler]);

  useEffect(() => {
    fetchPostCommentsHandler();
  }, [fetchPostCommentsHandler]);

  return (
    <main className={css.Main}>
      <BigPost id={props.id} onPostLike={fetchPostHandler} onDeletePost={deletePostHandler} onEditPost={editPostHandler} {...postData} />
      <div className={css.CommentsDiv}>
        {isLoading && (
          <Loader
            type="TailSpin"
            color="#1E81B0"
            height={100}
            width={100}
            timeout={3000}
          />
        )}
        <div className={css.LabelPostDiv}>
          {/* <label>Comments</label> */}
          <button className={css.CreateButton}>Create new comment</button>
        </div>
        <div className={css.CommentsList}>
          {!isLoading && error && <p>{error}</p>}
          {!isLoading && postComments.length === 0 && !error && (
            <p className={css.NoComments}>There are no comments yet</p>
          )}
          {!isLoading &&
            JSON.stringify(postComments).length !== 0 &&
            !error &&
            Array.from(postComments).map((Comment) => (
              <CommentCard
                {...Comment}
                onCommentLike={fetchPostCommentsHandler}
              />
            ))}
        </div>
      </div>
    </main>
  );
};

export default SinglePost;
