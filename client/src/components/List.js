import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { ImCircleUp } from 'react-icons/im';
import defaultPoster from '../assets/defaultPoster.png';
import ListItemDetail from './ListItemDetail';
import ModalImdbContent from './ModalImdbContent';
import Modal from './Modal';
import Tooltip from './Tooltip';
import FavoriteButton from './FavoriteButton';

const List = ({ imdbItems, page }) => {
    const modalRef = useRef(null);
    const [imdbData, setImdbData] = useState({});

    return (
        <>
            <div className={`items-row-${page}`}>
                {imdbItems && imdbItems.map((imdbItem) => (
                    <div className='poster-container' key={imdbItem.imdbID} >
                        <img src={imdbItem.Poster} alt={`${imdbItem.Title} poster`} onError={(e) => e.target.src=defaultPoster} aria-label='poster' />
                        <div className='poster-overlay'>
                            <div className='poster-buttons'>
                                <FavoriteButton imdbItem={imdbItem} />
                                <Tooltip type='modal'>
                                    <button onClick={() => {modalRef.current.openModal(); setImdbData(imdbItem)}} aria-label='open modal'>
                                        <ImCircleUp color='white' />
                                    </button>
                                </Tooltip>
                            </div>
                            <ListItemDetail imdbItem={imdbItem} className='overlay' />
                        </div>
                    </div>
                ))}
            </div>
            <Modal ref={modalRef} className='imdb-list'>
                <ModalImdbContent imdbData={imdbData} />
            </Modal>
        </>
    );
};

List.propTypes = {
    imdbItems: PropTypes.array,
    page: PropTypes.string,
}

export default List;

