import { useState, useContext, useCallback } from "react";
import AuthContext from "../store/auth-context";
import UserEdit from "./UserEdit/UserEdit";
import UserInfo from "./UserInfo/UserInfo";
import css from "./UserProfile.module.css";

const UserProfile = (props) => {
  const authCtx = useContext(AuthContext);
  const [editShow, setEditShow] = useState(false);

  const saveEditHandler = async (newData) => {
    try {
      const response = await fetch(
        `http://hack-ashp.herokuapp.com/api/users/${authCtx.userId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            full_name: newData,
            role: authCtx.role,
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
        authCtx.editProfile(newData);
        console.log(data);
      }
    } catch (error) {
      alert(error.message);
    }

    setEditShow(false);
  };

  return (
    <main className={css.Main}>
      <UserInfo show={editShow} onShowEdit={() => setEditShow(true)} />
      {editShow && (
        <UserEdit
          onCancel={() => setEditShow(false)}
          onSave={saveEditHandler}
        />
      )}
    </main>
  );
};

export default UserProfile;
