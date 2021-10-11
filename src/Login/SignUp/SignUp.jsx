import React, { useRef } from "react";
import css from "./SignUp.module.css";
// import AuthContext from '../../store/auth-context';
import Box from "../../UI/Box";
import * as Icon from "react-bootstrap-icons";
import Logo from "../../store/images/Logo.png";

const SignUp = (props) => {
  const loginRef = useRef("");
  const full_nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const password_confirmationRef = useRef("");

  const submitHandler = (event) => {
    event.preventDefault();

    // could add validation here...

    const user = {
      login: loginRef.current.value,
      full_name: full_nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: password_confirmationRef.current.value,
    };

    props.onCreateUser(user);
  };

  return (
    <Box className={css.SignUp}>
      <form onSubmit={submitHandler}>
        <img src={Logo} alt="Logo" />
        <div className={css.filedDiv}>
          <Icon.Person className={css.Icon} />
          <input type="text" placeholder="Login" ref={loginRef} />
        </div>
        <div className={css.filedDiv}>
          <Icon.Pencil className={css.Icon} />
          <input type="text" placeholder="Name" ref={full_nameRef} />
        </div>
        <div className={css.filedDiv}>
          <Icon.Envelope className={css.Icon} />
          <input type="email" placeholder="Email" ref={emailRef} />
        </div>
        <div className={css.filedDiv}>
          <Icon.ShieldLock className={css.Icon} />
          <input type="password" placeholder="Password" ref={passwordRef} />
        </div>
        <div className={css.filedDiv}>
          <Icon.ShieldLock className={css.Icon} />
          <input
            type="password"
            placeholder="Password repeat"
            ref={password_confirmationRef}
          />
        </div>
        <button type="submit" className={css.button}>
          Sign Up
        </button>
        <span className={css.link} onClick={props.onLog}>
          Already have an account?
        </span>
      </form>
    </Box>
  );
};

export default SignUp;
