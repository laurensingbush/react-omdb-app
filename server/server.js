if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const PORT = process.env.PORT || 3080;
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');
const app = express();

// middlewares
app.use(express.urlencoded({ extended: true}));
app.use(cors());

// serve static files from React app
app.use(express.static(path.join(__dirname, '../client/build')));


// respond with OMDb data by search query
app.get('/api/search', async (req, res) => {
    try {
        const searchQuery = req.query.s;
        if (searchQuery != null) {
            const api = `http://www.omdbapi.com/?s=${searchQuery}&apikey=${API_KEY}`;
            const response = await fetch(api, {headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }});
            const responseJSON = await response.json();
            res.json(responseJSON);
        } else {
            res.end();
        } 
    } catch (error) {
        console.error(error);
    }
});

// respond with OMDb data by ID query
app.get('/api/id', async (req, res) => {
    try {
        const id = req.query.i;
        const api = `http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`;
        const response = await fetch(api);
        const responseJSON = await response.json();
        res.json(responseJSON);
    } catch(error) {
        console.error(error);
    }
})

// send back React's index.html file for requests that don't match above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

