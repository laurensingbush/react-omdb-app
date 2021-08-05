import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthState } from './userContext';

const FavoritesContext = createContext(null);

export const useFavoritesState = () => {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavoritesState must be used within FavoritesContext Provider');
    };
    return context;
};

export const FavoritesProvider = ({ children }) => {
    const { user } = useAuthState();
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
   
    useEffect(() => {
        fetchFavorites();
    }, [user.isAuth]);

    const fetchFavorites = async () => {
        const data = { currentUser: user._id}
        const config = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await fetch('/api/favorite/getFavorites', config);
            const resJSON = await res.json();
            if (resJSON.success) {
                const favs = resJSON.favorites.map((favorite) => favorite.imdbDetails);
                setFavorites(favs);
                setIsLoading(false);
            } 
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        };
    };
   
    return (
        <FavoritesContext.Provider value={{ favorites, fetchFavorites, isLoading }}>
            {children}
        </FavoritesContext.Provider>
    );
};