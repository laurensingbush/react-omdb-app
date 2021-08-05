import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/favoritesContext';
import { AuthProvider } from './context/userContext';
import './styles/main.scss';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import FavoritesPage from './components/FavoritesPage';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import NotFoundPage from './components/NotFoundPage';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <NavBar setSearchValue={setSearchValue} />
          <Switch>
            <Route exact path='/' render={() => (<FavoritesProvider><HomePage searchValue={searchValue}/></FavoritesProvider>)} />
            <Route exact path='/favorites' render={() => (<FavoritesProvider><FavoritesPage/></FavoritesProvider>)} />
            <Route exact path='/register' component={RegisterPage} />
            <Route exact path='/login' component={LoginPage} />
            <Route path='*' component={NotFoundPage} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
