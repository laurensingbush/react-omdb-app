import React from 'react';
import PropTypes from 'prop-types';
import defaultPoster from '../assets/defaultPoster.png';
import ListItemDetail from './ListItemDetail';

const ModalContent = ({ imdbData }) => {

    const checkGenre = imdbData.Genre.split(',').length === 1 ? 'Genre' : 'Genres';

    return (
        <div className='modal-content-container' >
            <div className='modal-poster'>
                <img 
                    src={imdbData.Poster} 
                    alt={`${imdbData.Title} poster`} 
                    className='modal-poster-img' 
                    onError={(e) => e.target.src=defaultPoster} 
                />
            </div>
            <div className='modal-content'>
                <ListItemDetail imdbItem={imdbData} className='modal' />
                {imdbData.Plot !== 'N/A' && <p className='item-plot'>{imdbData.Plot}</p>}
                <ul className='modal-list'>
                    {imdbData.Actors !== 'N/A' && (
                        <li className='item-cast'>
                            <h3>Cast</h3>
                            <p>{imdbData.Actors}</p>
                        </li>
                    )}
                    {imdbData.Director !== 'N/A' && (
                        <li className='item-director'>
                            <h3>Director</h3>
                            <p>{imdbData.Director}</p>
                        </li>
                    )}
                    {imdbData.Genre !== 'N/A' && (
                        <li className='item-genre'>
                            <h3>{checkGenre}</h3>
                            <p>{imdbData.Genre}</p>
                        </li>
                    )}
                    {imdbData.imdbRating !== 'N/A' && (
                        <li className='item-rating'>
                            <h3>Rating</h3>
                            <p>{imdbData.imdbRating}/10</p>
                        </li>
                    )}
                </ul>
            </div>
        </div> 
    );
};

ModalContent.propTypes = {
    imdbData: PropTypes.object
};

export default ModalContent;