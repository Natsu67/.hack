import React, { useState, useEffect, useContext } from 'react';

import css from './App.module.css';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Home from './Home/Home';
import Login from './Login/Login';
import PostList from './PostList/PostList';
import Search from './Search/Search';
import AuthContext from './store/auth-context';

function App() {
	const ctxAuth = useContext(AuthContext);

	const [logInNow, setLogInNow] = useState(false);

	useEffect(() => {
		const storedLogInfo = localStorage.getItem('isLoggedIn');

		// if (storedLogInfo === '1') {
		// 	setIsLoggedIn(true);
		// }
	}, []);



	return (
		// <AuthContext.Provider value = {{ 
		// 	logInNow: logInNow,
		// 	isLoggedIn: isLoggedIn,
		// 	logout: logoutHandler,
		// 	setLogIn: setIsLoggedIn,
		// 	onLogInNow: setLogInNow
		// }}>
		<React.Fragment>
			<Header onStartLogIn={()=>setLogInNow(true)}/>
			<main className={css.Main}>
				{logInNow && <Login onEndLogIn={()=>setLogInNow(false)}/>}
				{ctxAuth.isLoggedIn && <Home />}
				<Search/>
				<PostList/>
			</main>
			<Footer/>
		</React.Fragment>
		// </AuthContext.Provider>
	);
}

export default App;
