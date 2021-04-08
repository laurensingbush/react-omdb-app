import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import './styles/main.scss';
import Nav from './components/Nav';
import List from './components/List';
import ListHeading from './components/ListHeading';
import NotFound from './components/NotFound';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({error: false, message: ''});
  const [searchValue, setSearchValue] = useState('');
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [favorites, setFavorites] = useLocalStorage('IMDb-favorites', []);
 
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
              setIsError({error: true, message: `Your search for "${searchValue}" has too many matches. Try using a more specifc title.`});
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

  
  //update favorite movies/tv shows from onClick event
  const updateFavorites = (listItem) => {
    let newFavoriteList = [...favorites];
    const exists = newFavoriteList.some((favorite) => favorite.imdbID === listItem.imdbID);
    if (!exists) {  // add to favorites
      newFavoriteList = [...favorites, listItem];
      setFavorites(newFavoriteList);
    } else {  // remove from favorites
      newFavoriteList = favorites.filter((favorite) => favorite.imdbID !== listItem.imdbID);
      setFavorites(newFavoriteList);
    }
  };

  return (
    <div className="App">
      <Router>
        <Nav setSearchValue={setSearchValue} />
        <Switch>
          <Route exact path='/'>
           {isError.error ? (
             <div className='error-msg'><p>{isError.message}</p></div>
           ) : (
            <>
              <ListHeading className={isLoading ? 'loading' : ''} header='Movies' />
              <List imdbItems={movies} className='home' favorites={favorites} onFavoriteClick={updateFavorites} />
              <ListHeading className={isLoading ? 'loading' : ''} header='Shows' />
              <List imdbItems={shows} className='home' favorites={favorites} onFavoriteClick={updateFavorites} />
            </>
           )}
          </Route>
          <Route path='/favorites'>
            <ListHeading header='Favorites' />
            <List imdbItems={favorites} className='favorites' favorites={favorites} onFavoriteClick={updateFavorites} />
          </Route>
          <Route path='*' component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
