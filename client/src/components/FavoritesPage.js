import React from 'react';
import { Link } from 'react-router-dom';
import { useFavoritesState } from '../context/favoritesContext';
import List from './List';
import ListHeading from './ListHeading';

const FavoritesPage = () => {
    const { favorites } = useFavoritesState();
    const userId = JSON.parse(localStorage.getItem('User'));

    return (
        <>
            {userId ? (
                <>
                    <ListHeading header='Favorites' />
                    <List imdbItems={favorites} page='favorites' />
                </>
            ) : (
                <div className='not-auth-favorites-container'>
                    <p>To view your list of favorite movies and tv shows</p>
                    <ul>
                        <li>
                            <Link to='/login'>
                                <button className='login'>
                                    Log In
                                </button>
                                <p>or</p>
                            </Link>
                        </li>
                        <li>
                            <Link to='/register'>
                                <button className='register'>
                                    Create Account
                                </button>
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default FavoritesPage;