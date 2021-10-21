import React from 'react';
import css from "./About.module.css"

const About = (props) => {
  return (
    <div className={css.Main}>
        <span className={css.ComingSoon}>Coming Soon ^_^</span>
        <img src="https://c.tenor.com/nStdUtR6F9oAAAAi/soft.gif" alt="Loader"/>
    </div>
  );
};

export default About;
