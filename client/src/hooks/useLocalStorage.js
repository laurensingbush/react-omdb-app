import React, { useState, useEffect } from 'react';

export const useLocalStorage = (key, defaultValue) => {
    const stored = localStorage.getItem(key);
    const initialValue = stored ? JSON.parse(stored) : defaultValue;
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};