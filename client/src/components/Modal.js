import React, { useEffect, useImperativeHandle, forwardRef, useCallback} from 'react';
import { useBoolean } from '../hooks/useBoolean';
import { createPortal } from 'react-dom';
import { BsXCircle } from 'react-icons/bs';

const modalRoot = document.getElementById('modal-root');

const Modal = forwardRef(({ children, initialValue = false, className }, ref) => {
    const [modalDisplay, openModal, closeModal] = useBoolean(initialValue);

    // expose methods to List
    useImperativeHandle(ref, () => ({
        openModal: () => openModal(),
        closeModal: () => closeModal()
    }));
    
    // close modal by ESC key
    const handleEscape = useCallback(e => {
        if (e.keyCode === 27) closeModal();
    }, [closeModal]);

    // listen for ESC keydown event and add blur class if modal is open
    useEffect(() => {
        if (modalDisplay) {
            document.addEventListener('keydown', handleEscape, false);
            if (className === 'imdb-list') {
                document.body.classList.add('modal-blur')
            }
        }
        return () => {
            document.body.classList.remove('modal-blur')
            document.removeEventListener('keydown', handleEscape, false);
        }
    }, [modalDisplay, handleEscape]);
    
    return modalDisplay 
        ? createPortal(
            <div className={`modal-container-${className}`} onClick={closeModal}>
                <div className={`modal-${className}`} onClick={(e) => e.stopPropagation()}>
                    <button className={`modal-btn-${className}`} onClick={closeModal} aria-label='close modal' >
                        <BsXCircle color='white' />
                    </button>
                    {children}
                </div>
            </div>, modalRoot)
        : null
});

export default Modal;
