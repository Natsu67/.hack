import React from 'react';

import Box from '../UI/Box';
import classes from './Home.module.css';

const Home = (props) => {
  return (
    <Box className={classes.Home}>
      <h1>Welcome back!</h1>
    </Box>
  );
};

export default Home;
