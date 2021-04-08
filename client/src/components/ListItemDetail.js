import React from 'react';
import PropTypes from 'prop-types';

const ListItemDetail = ({ imdbItem, className}) => {
    
    const checkSeasons = imdbItem.totalSeasons === '1' ? ' Season' : ' Seasons';

    const convertTime = (min) => {
        min = min.split(' ')[0];
        const hours = Math.floor(min / 60);
        const minutes = min % 60;
        const format = hours === 0 ? `${minutes}m` : (minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`);
        return format;
    };
   
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


