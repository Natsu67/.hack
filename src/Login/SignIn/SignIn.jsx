import React, { useState, useEffect,  useReducer, useContext} from 'react';
import css from "./SignIn.module.css";
import AuthContext from '../../store/auth-context';
import Box from '../../UI/Box';

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
                <div
                className={`${css.control} ${
                    emailState.isValid === false ? css.invalid : ''
                }`}
                >
                <label htmlFor="email">E-Mail</label>
                <input
                    type="email"
                    id="email"
                    value={emailState.value}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                />
                </div>
                <div
                className={`${css.control} ${
                    passwordState.isValid === false ? css.invalid : ''
                }`}
                >
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={passwordState.value}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                />
                </div>
                <div className={css.actions}>
                <button onClick={props.onReg}>Reg</button>
                <button type="submit" className={css.btn} disabled={!formIsValid}>
                    Login
                </button>
                </div>
            </form>
        </Box>
    );
}

export default SignIn;