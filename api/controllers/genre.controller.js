const GenreModel = require("../models/genre.model")

async function addGenre(req, res) {
    try {
        const genre = await GenreModel.create(req.body);
        res.status(200).json(genre);
    } catch (error) {
        res.status(500).send(`Error creating genre: ${error}`);
    }
}

async function getAllGenres(req, res) {
    try {
        const genres = await GenreModel.find()
        res.status(200).json(genres)
    } catch (error) {
        res.status(500).send(`Couldn't get all genres ${error}`)
    }
}

async function getOneGenre(req, res) {
    try {
        const genre = await GenreModel.findById(req.params.genreId)
        res.status(200).json(genre)
    } catch (error) {
        res.status(500).send(`Couldn't get user, error: ${error}`)
    }
}

async function updateGenre(req, res) {
    try {
        const genre = await GenreModel.findByIdAndUpdate(req.params.genreId, req.body)
        res.status(200).send("Changes were successfully updated")
    } catch (error) {
        res.status(500).send(`Couldn't update genre, error: ${error}`)
    }
}

async function removeGenre(req, res) {
    try {
        const genre = await GenreModel.findByIdAndDelete(req.params.genreId)
        res.status(200).send(`${genre.name} genre has been deleted`)
      } catch (error) {
        res.status(500).send(`Couldn't delete genre, error: ${error}`)
      }
}

module.exports = {
    addGenre,
    getAllGenres,
    getOneGenre,
    updateGenre,
    removeGenre
}