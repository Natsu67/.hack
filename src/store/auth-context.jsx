import React, {useState} from 'react';

const AuthContext = React.createContext({
    token:'',
    user_id: null,
    user_login: '',
    email: '',
    full_name:'',
    avatar_url:'',
    isLoggedIn: false,
    logInNow: false,
    switchLogInNow: () => {},
    login: (userData) => {},
    logout: () => {},
});

export const AuthContextProvider = (props) => {
    const [logInNow, setLogInNow] = useState(false);
    const [token, setToken] = useState(null);
    const [login, setLogin] = useState(null);

    const isLoggedIn = !!token;

    const switchLogInNowHandler = () => {
        setLogInNow((prevState) => !prevState);
    }

    const loginHandler = (userData) => {
        setToken(userData.token);
        setLogin(userData.user.login);
    }

    const logoutHandler = () => {
        setToken(null);
    }

    const contextValue = {
        token: token,
        user_login: login,
        isLoggedIn: isLoggedIn,
        logInNow: logInNow,
        switchLogInNow: switchLogInNowHandler,
        login: loginHandler,
        logout: logoutHandler,
    };

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}


export default AuthContext;