import React, { useState, useEffect,  useReducer, useContext} from 'react';
import css from "./SignIn.module.css";
import AuthContext from '../../store/auth-context';
import Box from '../../UI/Box';
import * as Icon from 'react-bootstrap-icons';
import Logo from '../../Header/Logo.png'

const emailReducer = (state, action) => {
	if (action.type === "USER_INPUT") {
		return {value: action.val, isValid: action.val.includes('@')};
	}
	if (action.type === "BLUR") {
		return {value: state.value, isValid: state.value.includes('@')};
	}
	return {value:'', isValid:false};
}

const passwordReducer = (state, action) => {
	if (action.type === "USER_INPUT") {
		return {value: action.val, isValid: action.val.trim().length >= 4};
	}
	if (action.type === "BLUR") {
		return {value: state.value, isValid: state.value.trim().length >= 4};
	}
	return {value:'', isValid:false};
}

const SignIn = (props) => {
    const ctx = useContext(AuthContext);

    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null});
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: null});

	useEffect(() => {
		const identifier = setTimeout(() => {
			setFormIsValid(
				emailState.isValid && passwordState.isValid
			);
		}, 500);

		return () => {
			clearTimeout(identifier);
		};
		
	}, [emailState.isValid, passwordState.isValid]);

    const emailChangeHandler = (event) => {
        dispatchEmail({type: "USER_INPUT", val: event.target.value});
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({type: "USER_INPUT", val: event.target.value});
    };

    const validateEmailHandler = () => {
        dispatchEmail({type: "BLUR"});
    };

    const validatePasswordHandler = () => {
        dispatchPassword({type: "BLUR"})
    };

    const submitHandler = (event) => {
        event.preventDefault();
        ctx.onLogIn(emailState.value, passwordState.value);
    };

    return (
        <Box className={css.SignIn}>
            <form onSubmit={submitHandler}>
                <img src={Logo} alt="Logo"/>
                <div className={css.filedDiv}>
                    <Icon.Envelope className={css.Icon}/>
                    <input
                        type="email"
                        id="email"
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                        placeholder="Email"
                    />
                </div>
                <div className={css.filedDiv}>
                    <Icon.ShieldLock className={css.Icon}/>
                    <input 
                        type="password"
                        id="password"
                        value={passwordState.value}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                        placeholder="Password"
                     />
                </div>
                <span className={css.link}>Forgot password?</span>
                <button type="submit" className={css.button} disabled={!formIsValid}>Sign In</button>
                <span className={css.link} onClick={props.onReg}>Create an account</span>
            </form>
        </Box>
    );
}

export default SignIn;