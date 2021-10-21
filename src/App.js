import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./Layout/Layout";
import Login from "./Login/Login";
import CategoryPostsPage from "./pages/CategoryPostsPage";
import CreatePostPage from "./pages/CreatePostPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SearchPostsPage from "./pages/SearchPostsPage";
import SearchUsersPage from "./pages/SearchUsersPage";
import SinglePostPage from "./pages/SinglePostPage";
import SingleUserPage from "./pages/SingleUserPage";
import UserListPage from "./pages/UserListPage";
import AuthContext from "./store/auth-context";

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
