const express = require('express');
const router = express.Router();
const Favorite = require('../models/favorite.model');

// POST request to find current user and send their favorites
router.post('/getFavorites', async (req, res) => {
    const { currentUser } = req.body;

    try {
        const favorites = await Favorite.find({ currentUser }).exec();
        res.status(200).json({ success: true, favorites});
    } catch (error) {
        res.status(500).json({ success: false, error: error});
    };
});

// POST request to check if imdb item already exists in favorites
router.post('/favorited', async (req, res) => {
    const { currentUser, imdbID } = req.body;
    try {
        const favorites = await Favorite.find({ currentUser, 'imdbDetails.imdbID': imdbID }).exec();
        const result = favorites.length !== 0 ? true : false;
       
        res.status(200).json({ success: true, isFavorited: result });

    } catch (error) {
        res.status(500).json({ success: false, error: error});
    };
});

// POST request to add favorite
router.post('/addFavorite', async (req, res) => {
    const { currentUser, ...rest } = req.body;
    const favorite = new Favorite({currentUser, 'imdbDetails': rest});

    try {
        await favorite.save();
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error});
    };
});

// POST request to remove favorite
router.post('/removeFavorite', async (req, res)=> {
    const { currentUser, imdbID } = req.body;
    try {
        await Favorite.findOneAndDelete({ currentUser, 'imdbDetails.imdbID': imdbID }).exec();
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error});
    };
});

module.exports = router;