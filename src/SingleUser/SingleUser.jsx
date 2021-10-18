import React, { useState, useEffect, useCallback } from "react";
import Loader from "react-loader-spinner";
import { useParams } from "react-router";

import css from "./SingleUser.module.css";

const SingleUser = (props) => {
  const [userData, setUserData] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className={css.Main}>
        {props.id}
    </div>

  );
};

export default SingleUser;
