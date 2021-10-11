import React from "react";
import * as Icon from "react-bootstrap-icons";
import css from "./Footer.module.css";

const Footer = (props) => {
    return (
        <div className={css.Footer}>
            <div className={css.Copyright}>
                <span>© All rights are protected</span>
            </div>
            <div className={css.SocialMedia}>
                <Icon.Twitter className={css.SocialMediaIcon}/>
                <Icon.Twitch className={css.SocialMediaIcon}/>
                <Icon.Github className={css.SocialMediaIcon}/>
                <Icon.Facebook className={css.SocialMediaIcon}/>
            </div>
        </div>
    );
}

export default Footer;