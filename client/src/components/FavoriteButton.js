import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useFavorites } from '../hooks/useFavorites';
import { useAuthState } from '../context/userContext';
import Tooltip from './Tooltip';

const FavoriteButton = ({ imdbItem }) => {
    const { user } = useAuthState();
    const { checkFavorited, isFavorited, addFavorite, removeFavorite } = useFavorites();
    const imdbData = {
        imdbID: imdbItem.imdbID,
        Type: imdbItem.Type,
        Title: imdbItem.Title,
        Poster: imdbItem.Poster,
        Plot: imdbItem.Plot,
        Genre: imdbItem.Genre,
        Year: imdbItem.Year,
        Runtime: imdbItem.Runtime,
        Rated: imdbItem.Rated,
        imdbRating: imdbItem.imdbRating,
        totalSeasons: imdbItem.totalSeasons,
        Actors: imdbItem.Actors,
        Director: imdbItem.Director
    };

    useEffect(() => {
        if (user.isAuth) {
            checkFavorited(imdbData.imdbID);
        }
    }, [user.isAuth]);

    const onFavoriteClick = () => {
        if (user && !user.isAuth) {
            return alert(`Please log in to add "${imdbData.Title}" to your favorites.`);
        };

        isFavorited ? removeFavorite(imdbData) : addFavorite(imdbData);
    };

    return (
        <Tooltip type='favorite' imdbItemID={imdbItem.imdbID} isFavorited={isFavorited} >
            <button onClick={onFavoriteClick}>
                {!isFavorited
                    ? <FaRegHeart color='white' data-testid='faRegHeart' />
                    : <FaHeart color='red' data-testid='faHeart' /> 
                }
            </button>
        </Tooltip>
    );
};

FavoriteButton.propTypes = {
    imdbItem: PropTypes.object
}

export default FavoriteButton;