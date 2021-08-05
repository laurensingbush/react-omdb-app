import React, { useState, useEffect, useRef } from 'react';
import { useAuthState } from '../context/userContext';
import { useFavoritesState } from '../context/favoritesContext';

export const useFavorites = () => {
    const { user } = useAuthState();
    const { fetchFavorites } = useFavoritesState();
    const [isFavorited, setIsFavorited] = useState(false);
    const mountedRef = useRef(false);
    
    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        }
    }, []);

    // check if movie/tv show is already in favorites
    const checkFavorited = async (imdbData) => {
        const data = {currentUser: user._id, imdbID: imdbData};
        const config = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await fetch('/api/favorite/favorited', config);
            const resJSON = await res.json();
            if (resJSON.success) {
                setIsFavorited(resJSON.isFavorited);
            } 
        } catch (error) {
            console.error(error)
        };
    };

    // add favorite movie/tv show
    const addFavorite = async (imdbData) => {
        const data = {currentUser: user._id, ...imdbData};
        const config = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await fetch('/api/favorite/addFavorite', config);
            const resJSON = await res.json();
            if (resJSON.success) {
                await fetchFavorites();
                setIsFavorited(!isFavorited);
            } 
        } catch (error) {
            console.error(error);
        };
    };

    // remove favorite movie/tv show
    const removeFavorite = async (imdbData) => {
        const data = {currentUser: user._id, imdbID: imdbData.imdbID };
        const config = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await fetch('/api/favorite/removeFavorite', config);
            const resJSON = await res.json();
            if (resJSON.success) {
                await fetchFavorites();
           
                // only update isFavorited if component is still mounted
                if (mountedRef.current) setIsFavorited(!isFavorited);
            } 
        } catch (error) {
            console.error(error);
        };
    };

    return { checkFavorited, isFavorited, addFavorite, removeFavorite };
};
