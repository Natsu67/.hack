import React, { useState, useEffect, useCallback } from "react";
import Post from "./Post/Post";
import Loader from "react-loader-spinner";

import css from "./PostList.module.css";
import Sort from "./Sort/Sort";

const PostList = (props) => {
  const [postsData, setPostsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortType, setSortType] = useState("created_at");
  const [sortDir, setSortDir] = useState("DESC");

  const onSortHandler = (num) => {
    switch (num) {
      case 1:
        setSortType("created_at");
        setSortDir("DESC");
        break;
      case 2:
        setSortType("created_at");
        setSortDir("ASC");
        break;
      case 3:
        setSortType("rating");
        setSortDir("DESC");
        break;
      case 4:
        setSortType("rating");
        setSortDir("ASC");
        break;
      default:
        break;
    }
  };

  const fetchPostsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://hack-ashp.herokuapp.com/api/posts?sort=${sortType}&dir=${sortDir}`,
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
      const transformedData = data.map((Post) => {
        return { key: Post.id, ...Post };
      });
      setPostsData(Array.from(transformedData));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [sortType, sortDir]);

  useEffect(() => {
    fetchPostsHandler();
  }, [fetchPostsHandler]);

  return (
    <div className={css.PostsAndSort}>
      <Sort sortType={sortType} sortDir={sortDir} onSort={onSortHandler}/>
      <div className={css.PostList}>
        {!isLoading && error && <p>{error}</p>}
        {!isLoading &&
          JSON.stringify(postsData).length !== 0 &&
          !error &&
          Array.from(postsData).map((post) => <Post {...post} />)}
        {!isLoading && JSON.stringify(postsData).length === 0 && !error && (
          <p>We got no posts</p>
        )}
        {isLoading && (
          <Loader
            type="TailSpin"
            color="#1E81B0"
            height={100}
            width={100}
            timeout={3000}
          />
        )}
      </div>
    </div>
  );
};

export default PostList;
