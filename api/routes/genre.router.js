const router = require('express').Router()
const { authUser, authAdmin } = require('../utils')

const {
    addGenre,
    getAllGenres,
    getOneGenre,
    updateGenre,
    removeGenre
} = require('../controllers/genre.controller')

router
    .post('/', authUser, authAdmin, addGenre)
    .get('/', authUser,getAllGenres)
    .get('/:genreId', authUser, getOneGenre)
    .put('/:genreId', authUser, authAdmin, updateGenre)
    .delete('/:genreId', authUser, authAdmin, removeGenre)

module.exports = router