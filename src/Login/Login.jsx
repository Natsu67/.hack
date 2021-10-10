import React, { useState, useContext} from 'react';
import classes from './Login.module.css'
import AuthContext from '../store/auth-context';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

const Login = (props) => {
    const ctx = useContext(AuthContext);

    const [regOrLog, setRegOrLog] = useState(false)

    const signUpHandler = async (user) => {
        const response = await fetch('http://hack-ashp.herokuapp.com/api/auth/register', {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        ctx.onLogInNow(false);
    }

    return (
        <div>
            <div className={classes.back} onClick={() => ctx.onLogInNow(false)}></div>
            {!regOrLog && <SignIn onReg={() => setRegOrLog(true)}/>}
            {regOrLog && <SignUp onLog={() => setRegOrLog(false)} onCreateUser={signUpHandler}/>}
        </div>
    );
};

export default Login;