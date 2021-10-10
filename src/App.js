import React, { useState, useEffect } from 'react';

import css from './App.module.css';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Home from './Home/Home';
import Login from './Login/Login';
import PostList from './PostList/PostList';
import Search from './Search/Search';
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
  
	// const loginHandler = (email, password) => {
	// 	// We should of course check email and password
	// 	// But it's just a dummy/ demo anyways
	// 	localStorage.setItem('isLoggedIn', '1');
	// 	setIsLoggedIn(true);
	// 	setLogInNow(false);
	// };
  
	const logoutHandler = () => {
		localStorage.removeItem('isLoggedIn');
		setIsLoggedIn(false);
	};
 



	return (
		<AuthContext.Provider value = {{ 
			logInNow: logInNow,
			isLoggedIn: isLoggedIn,
			onLogout: logoutHandler,
			setLogIn: setIsLoggedIn,
			onLogInNow: setLogInNow
		}}>
			<Header />
			<main className={css.Main}>
				{logInNow && <Login />}
				{isLoggedIn && <Home />}
				<Search/>
				<PostList/>
			</main>
			<Footer/>
		</AuthContext.Provider>
	);
}

export default App;
