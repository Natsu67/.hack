import React, { useState, useContext} from 'react';
import classes from './Login.module.css'
import AuthContext from '../store/auth-context';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

const Login = (props) => {
    const authCtx = useContext(AuthContext);

    const [regOrLog, setRegOrLog] = useState(false)

    const signUpHandler = async (user) => {
        try {
            const response = await fetch('http://hack-ashp.herokuapp.com/api/auth/register', {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message);
            } else {
                alert("Sign Up succeed! Now log in");
                setRegOrLog(false);
                console.log(data);
            }
        
        } catch (error) {
            alert(error.message);
        }
    }

    
    return (
        <div>
            <div className={classes.back} onClick={authCtx.switchLogInNow}></div>
            {!regOrLog && <SignIn onReg={() => setRegOrLog(true)}/>}
            {regOrLog && <SignUp onLog={() => setRegOrLog(false)} onCreateUser={signUpHandler}/>}
        </div>
    );
};

export default Login;