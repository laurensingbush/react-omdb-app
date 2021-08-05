const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

// GET request for OMDb data by search query
router.get('/search', async (req, res) => {
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

// GET request for OMDb data by ID query
router.get('/id', async (req, res) => {
    try {
        const id = req.query.i;
        const api = `http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`;
        const response = await fetch(api);
        const responseJSON = await response.json();
        res.json(responseJSON);
    } catch(error) {
        console.error(error);
    }
});

module.exports = router;