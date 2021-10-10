import React from 'react';

const AuthContext = React.createContext({
    logInNow: false,
    isLoggedIn: false,
    onLogout: () => {},
    setLogIn: () => {},
    onLogInNow: () => {}
});

export default AuthContext;