import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BsXCircle } from 'react-icons/bs';
import { GoSearch } from 'react-icons/go';

const SearchBar = ({ setSearchValue }) => {
    const [input, setInput] = useState('');
 
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    
    const clearInput = () => {
        setInput('');
        setSearchValue('');
    };
    
    useEffect(() => {
        // send search input to api call after a second
        const timeout = setTimeout(() => { setSearchValue(input.trim())}, 1000);

        return () => {
            clearTimeout(timeout);
        }
    }, [input]);
   
    return (
        <form onSubmit={handleSubmit} className='search-form' aria-label='form'>
            <label htmlFor='search-input'>
                <span className='visually-hidden'>Search Movies and TV Shows</span>
            </label>
            <div className='search-container'>
                <GoSearch className='search-icon' color='white' />
                <input 
                    type='text'
                    aria-label='search input'
                    id='search-input'
                    className='search-input'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='Search by title'
                    autoComplete='off'
                />
                {input.length !== 0 && (
                    <button onClick={clearInput} aria-label='clear input' className='clear-btn'>
                        <BsXCircle color='white' className='clear-icon' />
                    </button>
                )}
            </div>
        </form>
    );
};

SearchBar.propTypes = {
    setSearchValue: PropTypes.func
}

export default SearchBar;