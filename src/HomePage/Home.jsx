import React from 'react';
import css from './Home.module.css';
import Search from '../Search/Search';
import PostList from './PostList/PostList';

const Home = (props) => {
  return (
    <div className={css.Main}>
        <Search searchUrl={`/posts/search`}/>
        <PostList/>
    </div>
  );
};

export default Home;
