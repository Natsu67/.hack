import React, {useState, useContext, useCallback, useEffect} from 'react';
import Loader from 'react-loader-spinner';
import Post from '../HomePage/PostList/Post/Post';
import Search from '../Search/Search';
import AuthContext from '../store/auth-context';

import css from './SearchPosts.module.css';

const SearchPosts = (props) => {
    const authCtx = useContext(AuthContext);
    const [postsData, setPostsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPostsHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(
            `http://hack-ashp.herokuapp.com/api/posts/search/post`,
            {
              method: "POST",
                body: JSON.stringify({
                        "title_part": props.search_text
                    }),
              headers:  {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
            }
          );
          if (!response.ok) {
            throw new Error("Something went wrong");
          }
    
          const data = await response.json();
          const transformedData = data.map((Post) => {
            return { key: Post.id,  ...Post };
          });
          setPostsData(Array.from(transformedData));
        } catch (error) {
          setError(error.message);
        }
        setIsLoading(false);
      }, [props.search_text])

      useEffect(() => {
        fetchPostsHandler();
      }, [fetchPostsHandler]);

  return (
    <main className={css.Main}>
        <Search search_text={props.search_text} searchUrl={`/posts/search`}/>
        <div className={css.PostList}>
            {!isLoading && error && <p>{error}</p>}
            {!isLoading &&
            JSON.stringify(postsData).length !== 0 &&
            !error &&
            Array.from(postsData).map((post) => <Post {...post} onLike={fetchPostsHandler}/>)}
            {!isLoading && postsData.length === 0 && !error && (
            <p>We got no posts with "{props.search_text}"</p>
            )}
            {isLoading && (
            <Loader
                type="TailSpin"
                color="#1E81B0"
                height={100}
                width={100}
                timeout={3000}
            />
            )}
      </div>
    </main>
  );
};

export default SearchPosts;
