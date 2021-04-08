import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='not-found-container'>
            <h1>404</h1>
            <p>Page Not Found</p>
            <Link to='/'>
                <button>
                    Return Home
                </button>
            </Link>
        </div>
    );
};

export default NotFound;