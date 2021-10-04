import React from 'react';
import css from "./SignUp.module.css";
// import AuthContext from '../../store/auth-context';
import Box from '../../UI/Box';
import * as Icon from 'react-bootstrap-icons';
import Logo from '../../Header/Logo.png'

const SignUp = (props) => {
    return (
        <Box className={css.SignUp}>
            <form action="">
                <img src={Logo} alt="Logo"/>
                <div className={css.filedDiv}>
                    <Icon.Person className={css.Icon}/>
                    <input type="text" placeholder="Login" />
                </div>
                <div className={css.filedDiv}>
                    <Icon.Pencil className={css.Icon}/>
                    <input type="text" placeholder="Name" />
                </div>
                <div className={css.filedDiv}>
                    <Icon.Envelope className={css.Icon}/>
                    <input type="email" placeholder="Email" />
                </div>
                <div className={css.filedDiv}>
                    <Icon.ShieldLock className={css.Icon}/>
                    <input type="password" placeholder="Password" />
                </div>
                <div className={css.filedDiv}>
                <Icon.ShieldLock className={css.Icon}/>
                    <input type="password" placeholder="Password repeat" />
                </div>
                <button className={css.button}>Sign Up</button>
                <span className={css.link} onClick={props.onLog}>Already have an account?</span>
            </form>
        </Box>
    );
}

export default SignUp;