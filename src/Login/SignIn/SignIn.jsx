import React, { useState, useEffect, useReducer, useContext } from "react";
import css from "./SignIn.module.css";
import AuthContext from "../../store/auth-context";
import Box from "../../UI/Box";
import * as Icon from "react-bootstrap-icons";
import Logo from "../../Header/Logo.png";
import Loader from "react-loader-spinner";

const loginReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length >= 4 };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isValid: state.value.trim().length >= 4 };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length >= 4 };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isValid: state.value.trim().length >= 4 };
  }
  return { value: "", isValid: false };
};

const SignIn = (props) => {
  const ctx = useContext(AuthContext);

  const [formIsValid, setFormIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [loginState, dispatchLogin] = useReducer(loginReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(loginState.isValid && passwordState.isValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [loginState.isValid, passwordState.isValid]);

  const loginChangeHandler = (event) => {
    dispatchLogin({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const validateLoginHandler = () => {
    dispatchLogin({ type: "BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "BLUR" });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    if (formIsValid) {
        try {
            const response = await fetch('http://hack-ashp.herokuapp.com/api/auth/login', {
                method: "POST",
                body: JSON.stringify({
                    login: loginState.value,
                    password: passwordState.value
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();

            if (response.ok) {
                console.log(data);
                localStorage.setItem('isLoggedIn', '1');
                ctx.setLogIn(true);
                ctx.onLogInNow(false);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            alert(error);
        }
    }
    setIsLoading(false);
  };

  return (
    <Box className={css.SignIn}>
      {isLoading && (
        <Loader
          type="TailSpin"
          color="#1E81B0"
          height={100}
          width={100}
          timeout={3000}
        />
      )}
      {!isLoading && (
        <form onSubmit={submitHandler}>
          <img src={Logo} alt="Logo" />
          <div className={css.filedDiv}>
            <Icon.Person className={css.Icon} />
            <input
              type="text"
              value={loginState.value}
              onChange={loginChangeHandler}
              onBlur={validateLoginHandler}
              placeholder="Login"
            />
          </div>
          <div className={css.filedDiv}>
            <Icon.ShieldLock className={css.Icon} />
            <input
              type="password"
              value={passwordState.value}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
              placeholder="Password"
            />
          </div>
          <span className={css.link}>Forgot password?</span>
          <button type="submit" className={css.button} disabled={!formIsValid}>
            Sign In
          </button>
          <span className={css.link} onClick={props.onReg}>
            Create an account
          </span>
        </form>
      )}
    </Box>
  );
};

export default SignIn;
