import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Box from "../../UI/Box";
import css from "./Header.module.css";
import Logo from "../../store/images/Logo.png";
import Nav from "./Navigation/Nav";
import AuthContext from "../../store/auth-context";

const Header = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <Box className={css.Header}>
      <Link to="/"><img src={Logo} className={css.logoImage} alt="Logo" /></Link>
      <Nav />
      {!authCtx.isLoggedIn && (
        <button className={css.button} onClick={authCtx.switchLogInNow}>
          Log in
        </button>
      )}
      {authCtx.isLoggedIn && (
        <div className={css.RightBox}>
          <img src={authCtx.avatarUrl} className={css.Avatar} alt='User avatar'/>
          <Link to="/profile" className={css.UserLogin}>{authCtx.userLogin}</Link>{" "}
          <button className={css.button} onClick={authCtx.logout}>
            Log out
          </button>
        </div>
      )}
    </Box>
  );
};

export default Header;
