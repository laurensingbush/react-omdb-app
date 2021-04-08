import React from 'react';
import { useBoolean } from '../hooks/useBoolean';
import PropTypes from 'prop-types';

const Tooltip = (props) => {
    let timeout;
    const [isActive, toggleShow, toggleHide] = useBoolean(false);

    const showTooltip = () => {
        timeout = setTimeout(() => {
            toggleShow();
        }, 400);
    };

    const hideTooltip = () => {
        clearInterval(timeout);
        toggleHide();
    };

    return (
        <div className='tooltip-container' onMouseEnter={showTooltip} onMouseLeave={hideTooltip} >
            {props.children}
            {isActive && props.type === 'favorite' && (
                <div className='tooltip-content'>
                    {props.favorites.some((favorite) => favorite.imdbID === props.imdbItemID) 
                        ? 'Remove from Favorites' 
                        : 'Add to Favorites'
                    }
                </div>
            )}
            {isActive && props.type === 'modal' && (
                <div className='tooltip-content'>
                    More info
                </div>
            )}
        </div>
    );
};

Tooltip.propTypes = {
    type: PropTypes.string,
    imdbItemID: PropTypes.string,
    favorites: PropTypes.array
};

export default Tooltip;