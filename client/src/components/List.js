import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { ImCircleUp } from 'react-icons/im';
import defaultPoster from '../assets/defaultPoster.png';
import ListItemDetail from './ListItemDetail';
import ModalContent from './ModalContent';
import Modal from './Modal';
import Tooltip from './Tooltip';

const List = (props) => {
    const modalRef = useRef(null);
    const [imdbData, setImdbData] = useState({});

    return (
        <>
            <div className={`items-row-${props.className}`}>
                {props.imdbItems && props.imdbItems.map((imdbItem) => (
                    <div className='poster-container' key={imdbItem.imdbID} >
                        <img src={imdbItem.Poster} alt={`${imdbItem.Title} poster`} onError={(e) => e.target.src=defaultPoster} aria-label='poster' />
                        <div className='poster-overlay'>
                            <div className='poster-buttons'>
                                <Tooltip type='favorite' imdbItemID={imdbItem.imdbID} favorites={props.favorites}>
                                    <button onClick={() => props.onFavoriteClick(imdbItem)} aria-label='favorite'>
                                        {props.favorites.some((favorite) => favorite.imdbID === imdbItem.imdbID) 
                                            ? <FaHeart color='red' data-testid='faHeart' /> 
                                            : <FaRegHeart color='white' data-testid='faRegHeart' />
                                        }
                                    </button>
                                </Tooltip>
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
            <Modal ref={modalRef} >
                <ModalContent imdbData={imdbData} />
            </Modal>
        </>
    );
};

List.propTypes = {
    imdbItems: PropTypes.array,
    className: PropTypes.string,
    favorites: PropTypes.array,
    onFavoriteClick: PropTypes.func
}

export default List;

