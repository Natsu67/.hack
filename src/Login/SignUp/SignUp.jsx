import React, { useState, useEffect,  useReducer, useContext} from 'react';
import css from "./SignUp.module.css";
import AuthContext from '../../store/auth-context';
import Box from '../../UI/Box';

const SignUp = (props) => {
    return (
        <Box className={css.SignUp}>
            <button onClick={props.onLog}>Log</button>
        </Box>
    );
}

export default SignUp;