const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    currentUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    imdbDetails: 
        {
            imdbID: String,
            Poster: String,
            Title: String,
            Plot: String,
            Genre: String,
            Year: String,
            Runtime: String,
            Rated: String,
            imdbRating: String,
            totalSeasons: String,
            Actors: String,
            Director: String
        }
    
}, { timestamps: true})

module.exports = mongoose.model('Favorite', favoriteSchema);