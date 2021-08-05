import React from 'react';
import PropTypes from 'prop-types';
import convertTime from '../utils/convertTime';

const ListItemDetail = ({ imdbItem, className }) => {
    
    const checkSeasons = imdbItem.totalSeasons === '1' ? ' Season' : ' Seasons';
   
    return (
        <div className={`detail-container-${className}`} data-testid='listItemDetail'>
            <h2>{imdbItem.Title}</h2>
            <ul className='detail-list-one'>
                {imdbItem.Year !== 'N/A' && <li className='item-year'>{imdbItem.Year}</li>}
                {imdbItem.Rated !== 'N/A' && <li className='item-rated'>{imdbItem.Rated}</li>}
                 <li className='item-type'>
                    {imdbItem.Type === 'movie' 
                        ? imdbItem.Runtime !== 'N/A' && convertTime(imdbItem.Runtime) 
                        : imdbItem.totalSeasons !== 'N/A' && imdbItem.totalSeasons + checkSeasons 
                    }
                </li>
            </ul>
            <ul className='detail-list-two'>
                {imdbItem.Genre !== 'N/A' && imdbItem.Genre.split(', ').map((genre, index) => (
                    <li key={index} className='item-genre'>{genre}</li>
                ))}
            </ul>
        </div> 
    );
};

ListItemDetail.propTypes = {
    className: PropTypes.string,
    imdbItem: PropTypes.object
}

export default ListItemDetail;


