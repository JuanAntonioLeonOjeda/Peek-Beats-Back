const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    streams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "stream",
    }],
    image: {
        type: String
    }
})

const GenreModel = mongoose.model('genre', genreSchema)

module.exports = GenreModel