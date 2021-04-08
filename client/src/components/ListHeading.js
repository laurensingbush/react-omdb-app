import React from 'react';
import PropTypes from 'prop-types';

const ListHeading = ({ header, className }) => {
    return (
        <header className={`list-header list-header-${className}`}>
            <h1>{header}</h1>
        </header>
    );
};

ListHeading.propTypes = {
    header: PropTypes.string,
    className: PropTypes.string
};

export default ListHeading;