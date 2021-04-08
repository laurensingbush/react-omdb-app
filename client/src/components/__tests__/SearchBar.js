import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../SearchBar';

const setSearchValue = jest.fn();

describe('SearchBar', () => {
    it('should render correctly', () => {
        render(<SearchBar setSearchValue={setSearchValue}/>);
        const form = screen.getByRole('form', {name: /form/i});

        expect(form).toBeTruthy(); //form exists
    });
    it('should call setSearchValue after 1s after typing', async () => {
        render(<SearchBar setSearchValue={setSearchValue}/>);
        const input = screen.getByPlaceholderText(/search by title/i);

        userEvent.type(input, 'test');

        // won't be called immediately after typing
        expect(setSearchValue).not.toHaveBeenCalledWith('test');
        expect(setSearchValue).not.toHaveBeenCalled();

        //but will be called within 1.1s
        await waitFor(() => expect(setSearchValue).toHaveBeenCalledWith('test'), {timeout: 1100});
        expect(setSearchValue).toHaveBeenCalledTimes(1);
    })
    it('should show button on input and hide on click or deleted input', () => {
        render(<SearchBar setSearchValue={setSearchValue}/>);
        const input = screen.getByPlaceholderText(/search by title/i);
        
        // button is hidden
        expect(screen.queryByRole('button', {name: /clear input/i})).not.toBeInTheDocument();

        // after typing, button is shown
        userEvent.type(input, 'test');
        expect(screen.getByRole('button', {name: /clear input/i})).toBeInTheDocument();

        // on click, button is hidden
        userEvent.click(screen.getByRole('button', {name: /clear input/i}));
        expect(screen.queryByRole('button', {name: /clear input/i})).not.toBeInTheDocument();

        // OR button is hidden when user deletes their input
        userEvent.type(input, 'test');
        userEvent.type(input, '{selectall}{backspace}');
        expect(screen.queryByRole('button', {name: /clear input/i})).not.toBeInTheDocument();
    })
    it('should clear search input on button click', () => {
        render(<SearchBar setSearchValue={setSearchValue}/>);
        const input = screen.getByPlaceholderText(/search by title/i);

        userEvent.type(input, 'test');
        userEvent.click(screen.getByRole('button', {name: /clear input/i}));
        expect(input).toHaveValue('');
    })
});


