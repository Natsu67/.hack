import React from "react";
import Box from "../../UI/Box";
import * as Icon from "react-bootstrap-icons";
import css from "./Post.module.css";


const Post = (props) => {
    let contentText = props.content;
    if(contentText.length > 240) contentText = contentText.substring(0, 240) + "...";

    return (
        <Box className={css.Post}>
            <div className={css.PostMark}>
                <Icon.ChevronUp className={css.MarkButton}/>
                <span className={css.Rating}>{props.rating}</span>
                <Icon.ChevronDown className={css.MarkButton}/>
            </div>
            <div className={css.PostMain}>
                <div>
                    <span className={css.PostTitle}>{props.title}</span>
                    <div className={css.CategoriesAndUser}>
                        {Array.from(props.categories).map((Category) => {
                            return <span key={Category.category_id}>#{Category.category_name}</span>;
                        })}
                        <Icon.Person className={css.PersonIcon}/>
                        <span>{props.user_login}</span>
                    </div>
                    <div className={css.PostContent}>
                        <span className={css.PostContentText}>{contentText}</span>
                    </div>
                </div>
                <div>
                    <div className={css.PostDate}>
                        <span>{new Date(props.updated_at).toUTCString()}</span>
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default Post;
