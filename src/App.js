import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./Layout/Layout";
import Login from "./Login/Login";
import CategoryPostsPage from "./Pages/CategoryPostsPage";
import CreatePostPage from "./Pages/CreatePostPage";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import ProfilePage from "./Pages/ProfilePage";
import SearchPostsPage from "./Pages/SearchPostsPage";
import SearchUsersPage from "./Pages/SearchUsersPage";
import SinglePostPage from "./Pages/SinglePostPage";
import SingleUserPage from "./Pages/SingleUserPage";
import UserListPage from "./Pages/UserListPage";
import AuthContext from "./store/auth-context";
import { CSSTransition } from 'react-transition-group'
function App() {
  const ctxAuth = useContext(AuthContext);

  return (
    <Layout>
      {ctxAuth.logInNow && <Login />}
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/users" exact>
          <UserListPage />
        </Route>
        <Route path="/user/:user_id" >
          <SingleUserPage/>
        </Route>
        <Route path="/category/:category_id/:category_name" >
          <CategoryPostsPage/>
        </Route>
        <Route path="/post/:post_id" >
          <SinglePostPage/>
        </Route>
        <Route path="/posts/search/:search_text" >
          <SearchPostsPage/>
        </Route>
        <Route path="/users/search/:search_text" >
          <SearchUsersPage/>
        </Route>
        <Route path="/about" >
          <AboutPage/>
        </Route>
        {ctxAuth.isLoggedIn && (
          <Route path="/profile">
            <ProfilePage />
          </Route>
        )}
        {ctxAuth.isLoggedIn && (
          <Route path="/createPost">
            <CreatePostPage />
          </Route>
        )}
		    <Route path="*" >
          <Redirect to='/'/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
