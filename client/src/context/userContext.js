import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthStateContext = createContext(null);

export const useAuthState = () => {
    const context = useContext(AuthStateContext);
    if (context === undefined) {
        throw new Error('useAuthState must be used within AuthStateContext Provider');
    };
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const res = await fetch('/api/auth');
            const resJSON = await res.json();
            setUser(resJSON);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        };
    };

    return (
        <AuthStateContext.Provider value={{ user, checkAuth, isLoading }}>
            {children}
        </AuthStateContext.Provider>
    );
};