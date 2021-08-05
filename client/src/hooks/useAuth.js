import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthState } from '../context/userContext';

export const useAuth = () => {
    let history = useHistory();
    const { checkAuth } = useAuthState();
    const [error, setError] = useState('');

    // register user
    const registerUser = async (data) => {
        const { firstName, lastName, email, password } = data;
        const config = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        }; 
        try {
            const res = await fetch('/api/register', config);
            const resJSON = await res.json();
            if (resJSON.success) {
                await checkAuth();
                history.push('/login');
            } else {
                setError(resJSON.error);
            }
        } catch (error) {
            console.error(error);
        };
    };

    // login user
    const loginUser = async (data) => {
        const { email, password } = data;
        const config = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        try {
            const res = await fetch('/api/login', config);
            const resJSON = await res.json();
            if (resJSON.success) {
                await checkAuth();
                history.push('/');
                localStorage.setItem('User', JSON.stringify(resJSON.userId));
            } else {
                setError(resJSON.error);
            }
        } catch (error) {
            console.error(error);
        };
    };

    // logout user
    const logoutUser = async () => {
        try {
            const res = await fetch('/api/logout');
            const resJSON = await res.json();
            if (resJSON.success) {
                await checkAuth();
                history.push('/');
                localStorage.removeItem('User');
            } else {
                setError(resJSON.error);
            }
        } catch (error) {
            console.error(error);
        };
    };

    return { registerUser, loginUser, logoutUser, error, setError };
};