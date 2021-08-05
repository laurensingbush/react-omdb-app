import React from 'react';
import PropTypes from 'prop-types';
import { useAuthState } from '../context/userContext';
import { useAuth } from '../hooks/useAuth';


const ModalUserContent = ({ modalRef }) => {
    const { user } = useAuthState();
    const { logoutUser } = useAuth();
    
    return (
        <div className='modal-user-content-container'>
            <div className='user-circle'>
                <p>{user.firstName[0]}</p>
            </div>
            <div className='user-details'>
                <p>{`${user.firstName} ${user.lastName}`}</p>
                <p>{user.email}</p>
            </div>
            <hr />
            <button onClick={() => {logoutUser(); modalRef.current.closeModal()}}>
                Log out
            </button>
        </div>
    );
};

ModalUserContent.propTypes = {
    modalRef: PropTypes.object
};

export default ModalUserContent;