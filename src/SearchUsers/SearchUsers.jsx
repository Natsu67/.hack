import React, {useState, useContext, useCallback, useEffect} from 'react';
import Loader from 'react-loader-spinner';
import Post from '../Home/PostList/Post/Post';
import AuthContext from '../store/auth-context';
import SearchUser from '../UserList/Search/SearchUser';
import UserCard from '../UserList/UserCard/UserCard';

import css from './SearchUsers.module.css';

const SearchUsers = (props) => {
    const [usersData, setUsersData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPostsHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(
            `http://hack-ashp.herokuapp.com/api/users/search/user`,
            {
              method: "POST",
                body: JSON.stringify({
                        "login_part": props.search_text
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
          const transformedData = data.map((User) => {
            return { key: User.id,  ...User };
          });
          setUsersData(Array.from(transformedData));
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
        <SearchUser search_text={props.search_text}/>
        <div className={css.UserList}>
            {!isLoading && error && <p>{error}</p>}
            {!isLoading && usersData.length === 0 && !error && (
              <p>We got no users</p>
            )}
            {!isLoading &&
            JSON.stringify(usersData).length !== 0 &&
            !error &&
            Array.from(usersData).map((User) => <UserCard {...User} />)}

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

export default SearchUsers;
