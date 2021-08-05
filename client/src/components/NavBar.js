import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { useAuthState } from '../context/userContext';
import SearchBar from './SearchBar';
import Modal from './Modal';
import ModalUserContent from './ModalUserContent';

const NavBar = ({ setSearchValue }) => {
    const location = useLocation();
    const { user, isLoading } = useAuthState();
    const modalRef = useRef(null);
  
    return (
        <>
            <nav>
                <ul className='left-links'> 
                    <li>
                        <Link to='/'>Search</Link>
                    </li>
                    <li>
                        <Link to='/favorites'>Favorites</Link>
                    </li>
                </ul>
                <ul className='right-links'>
                    {isLoading ? 
                        null
                        : user && !user.isAuth ? (
                            <>
                                <li>
                                    <Link to='/register'>Register</Link>
                                </li>
                                <li>
                                    <Link to='/login'>Log In</Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <div className='user-circle' onClick={() => modalRef.current.openModal()}>
                                    <p>{user && user.firstName[0]}</p>
                                </div>
                            </li>
                        )}
                </ul>
                <div className='nav-searchbar'>
                    {location.pathname === '/' && (
                        <SearchBar setSearchValue={setSearchValue} /> 
                    )}
                </div>
            </nav>
            <hr/>
            <Modal ref={modalRef} className='user' >
                <ModalUserContent modalRef={modalRef} />
            </Modal>
        </>
    );
};

NavBar.propTypes = {
    setSearchValue: PropTypes.func
};

export default NavBar;