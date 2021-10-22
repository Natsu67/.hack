import css from './Nav.module.css';
import { Link, useLocation } from 'react-router-dom';


const Nav = (props) => {
    const loc = useLocation();

    return (
        <ul className ={css.Nav}>
            <li className={(loc.pathname === '/'  ||  loc.pathname.includes('/posts')) ? css.Active : null}><Link to="/">Posts</Link></li>
            <li className={(loc.pathname === 'users'  ||  loc.pathname.includes('/users')) ? css.Active : null}><Link to="/users">Users</Link></li>
            <li className={loc.pathname === '/about' ? css.Active : null}><Link to="/about">About</Link></li>
        </ul>
    );
}

export default Nav;