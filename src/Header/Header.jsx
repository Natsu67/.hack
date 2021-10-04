import React, {useContext} from 'react';
import Box from '../UI/Box';
import css from './Header.module.css';
import Logo from './Logo.png'
import Nav from './Navigation/Nav';
import AuthContext from '../store/auth-context';

const Header = (props) => {
    const ctx = useContext(AuthContext);

    return (
        <Box className = {css.Header}>
            <img src={Logo} className={css.logoImage} alt="Logo"/>
            <Nav/>
            {!ctx.isLoggedIn && <button className={css.button} onClick={() => ctx.onLogInNow(true)}>Log in</button>}
            {ctx.isLoggedIn && <button className={css.button} onClick={ctx.onLogout}>Log out</button>}
        </Box>
    );
}

export default Header;