import css from './Nav.module.css';

const Nav = (props) => {
    return (
        <ul className ={css.Nav}>
            <li><a href="###">Posts</a></li>
            <li><a href="###">Users</a></li>
            <li><a href="###">About</a></li>
        </ul>
    );
}

export default Nav;