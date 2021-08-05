import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import List from './List';
import ListHeading from './ListHeading';

const HomePage = ({ searchValue }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({error: false, message: ''});
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    if (searchValue) setIsLoading(true);

    const fetchImdbData = async (searchValue) => {
      try {
        // fetch data by search value
        const searchResponse = await fetch(`/api/search?s=${searchValue}`, {signal: abortController.signal});
        if (!searchResponse.ok) {
          throw new Error(`HTTP error! status: ${searchResponse.status}`);
        } else {
          const searchResponseJSON = await searchResponse.json();
          const search = searchResponseJSON.Search;
        
          if (searchValue && searchResponseJSON.Response === 'False') {
            setIsLoading(false);
            if (searchResponseJSON.Error === 'Movie not found!' || 'Incorrect IMDb ID.') {
              setIsError({error: true, message: `Your search for "${searchValue}" did not have any matches.`});
            } 
            if (searchResponseJSON.Error === 'Too many results.') {
              setIsError({error: true, message: `Your search for "${searchValue}" has too many matches. Try using a more specific title.`});
            }
          } else {
            setIsError({error: false, message: ''});
          }
          
          if (search) {
            const imdbIds = search.map((item) => item.imdbID);
            
            // fetch data by id and update movies and shows state
            await Promise.all(imdbIds.map(async (id) => {
              const idResponse = await fetch(`api/id/?i=${id}`, {signal: abortController.signal});
              const idResponseJSON = await idResponse.json();
              if (idResponseJSON) {
                setIsLoading(false);
                setIsError({error: false, message: ''});
                
                if (idResponseJSON.Type === 'movie') {
                  setMovies(movies => [...movies, idResponseJSON]);
                }
                if (idResponseJSON.Type === 'series') {
                  setShows(shows => [...shows, idResponseJSON]);
                } 
              }
            }));
          }
        }
      } catch(error) {
          if (abortController.signal.aborted) {
            console.log('Request aborted.');
          } else {
            console.error(error);
          }
      };
    };

    fetchImdbData(searchValue);

    return () => {
      // reset to initial state
      setMovies([]);
      setShows([]);

      // cancel fetch request
      abortController.abort();
    }
  }, [searchValue]);

  return (
      <>
        {isError.error ? (
          <div className='error-msg'><p>{isError.message}</p></div>
        ) : (
          <>
            <ListHeading className={isLoading ? 'loading' : ''} header='Movies' />
            <List imdbItems={movies} page='home' />
            <ListHeading className={isLoading ? 'loading' : ''} header='Shows' />
            <List imdbItems={shows} page='home' />
          </>
          )}
      </>
  );
};

HomePage.propTypes = {
  searchValue: PropTypes.string
}

export default HomePage;