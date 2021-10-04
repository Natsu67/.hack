import React, { useState, useEffect } from 'react';

// import css from './App.module.css';
import Header from './Header/Header';
import Home from './Home/Home';
import Login from './Login/Login';
import AuthContext from './store/auth-context';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [logInNow, setLogInNow] = useState(false);

	useEffect(() => {
		const storedLogInfo = localStorage.getItem('isLoggedIn');

		if (storedLogInfo === '1') {
			setIsLoggedIn(true);
		}
	}, []);
  
	const loginHandler = (email, password) => {
		// We should of course check email and password
		// But it's just a dummy/ demo anyways
		localStorage.setItem('isLoggedIn', '1');
		setIsLoggedIn(true);
		setLogInNow(false);
	};
  
	const logoutHandler = () => {
		localStorage.removeItem('isLoggedIn');
		setIsLoggedIn(false);
	};
 



	return (
		<AuthContext.Provider value = {{ 
			logInNow: logInNow,
			isLoggedIn: isLoggedIn,
			onLogout: logoutHandler,
			onLogIn: loginHandler,
			onLogInNow: setLogInNow
		}}>
			<Header />
			<main>
				{logInNow && <Login onLogin={loginHandler}/>}
				{isLoggedIn && <Home />}
			</main>
		</AuthContext.Provider>
	);
}

export default App;
