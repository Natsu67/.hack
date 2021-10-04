import React, { useState, useContext} from 'react';
import classes from './Login.module.css'
import AuthContext from '../store/auth-context';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

const Login = (props) => {
    const ctx = useContext(AuthContext);

    const [regOrLog, setRegOrLog] = useState(false)

    return (
        <div>
            <div className={classes.back} onClick={() => ctx.onLogInNow(false)}></div>
            {!regOrLog && <SignIn onReg={() => setRegOrLog(true)}/>}
            {regOrLog && <SignUp onLog={() => setRegOrLog(false)}/>}
        </div>
    );
};

export default Login;