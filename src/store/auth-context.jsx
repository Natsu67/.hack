import React from 'react';

const AuthContext = React.createContext({
    logInNow: false,
    isLoggedIn: false,
    onLogout: () => {},
    onLogIn: () => {},
    onLogInNow: () => {}
});

export default AuthContext;