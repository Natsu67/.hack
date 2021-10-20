import React from "react";
import { useParams } from "react-router";
import SinglePost from "../SinglePost/SinglePost";

const SinglePostPage = (props) => {
  let { post_id } = useParams();
  return <SinglePost id={post_id} />;
};

export default SinglePostPage;
