import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BsEyeSlash, BsEye } from 'react-icons/bs';

const PasswordInput = (props) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setIsVisible(!isVisible);
    };
    
    return (
        <div className='password-input'>
            <input
                type={isVisible ? 'text' : 'password'}
                aria-label={props['aria-label']}
                id={props.id}
                placeholder={props.placeholder}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
                autoComplete={props.autoComplete} 
                className={props.className}
            />
            <button onClick={handleClick} aria-label='show/hide password'>
                {isVisible
                    ? <BsEye className='password-icon' /> 
                    : <BsEyeSlash className='password-icon' />
                }
            </button>
        </div>
    );
};

PasswordInput.propTypes = {
    ['aria-label']: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    autoComplete: PropTypes.string,
    className: PropTypes.string
}

export default PasswordInput;