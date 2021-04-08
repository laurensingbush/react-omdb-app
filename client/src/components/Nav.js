import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';

const Nav = ({ setSearchValue }) => {
    const location = useLocation();

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Search</Link>
                    </li>
                    <li>
                        <Link to='/favorites'>Favorites</Link>
                    </li>
                </ul>
                <div>
                    {location.pathname !== '/favorites' && (
                        <SearchBar setSearchValue={setSearchValue} /> 
                    )}
                </div>
            </nav>
            <hr/>
        </>
    );
};

Nav.propTypes = {
    setSearchValue: PropTypes.func
};

export default Nav;