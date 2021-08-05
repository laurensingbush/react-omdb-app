import React, { useEffect } from 'react';
import { useBoolean } from '../hooks/useBoolean';
import PropTypes from 'prop-types';

const Tooltip = (props) => {
    const [isActive, toggleShow, toggleHide] = useBoolean(false);

    useEffect(() => {
        // show tooltip after 400ms
        const timeout = isActive && setTimeout(() => { toggleShow() }, 400);

        return () => {
            clearTimeout(timeout);
        }
    }, [isActive]);

    return (
        <div className='tooltip-container' onMouseEnter={toggleShow} onMouseLeave={toggleHide} >
            {props.children}
            {isActive && props.type === 'favorite' && (
                <div className='tooltip-content'>
                    {!props.isFavorited
                        ? 'Add to Favorites'
                        : 'Remove from Favorites' 
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
    isFavorited: PropTypes.bool
};

export default Tooltip;