import React from "react";
import { useParams } from "react-router";
import SingleUser from "../SingleUser/SingleUser";

const SingleUserPage = (props) => {
  let { user_id } = useParams();
  return <SingleUser id={user_id}/>;
};

export default SingleUserPage;
