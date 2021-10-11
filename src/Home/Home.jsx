import React from 'react';
import Search from './Search/Search';
import PostList from './PostList/PostList';

import css from './Home.module.css';

const Home = (props) => {
  return (
    <main className={css.Main}>
        <Search/>
        <PostList/>
    </main>
  );
};

export default Home;
