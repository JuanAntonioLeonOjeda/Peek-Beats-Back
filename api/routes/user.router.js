const router = require('express').Router()
const { authUser, authAdmin } = require('../utils')

const { 
    getAllUsers,
    getTopStreamers,
    deleteProfile, 
    getProfile, 
    updateProfile, 
    getAllMyStreams, 
    getMyBadges,
    getMyFriends,
    addFriend,
    removeFriend,
    getMyFavoriteStreamers,
    addFavoriteStreamer,
    removeFavoriteStreamer,
    getMyFavoriteGenres,
    addFavoriteGenre,
    removeFavoriteGenre,
    changePassword,
    getOneUser, 
    addBadgeToUser,
    removeBadgeFromUser
} = require('../controllers/user.controller')

router
    .get('/', authUser, authAdmin, getAllUsers)
    .get('/top', authUser, getTopStreamers)
    .get('/me', authUser, getProfile)
    .delete('/me/security', authUser, deleteProfile)
    .put('/me', authUser, updateProfile)
    .get('/me/streams', authUser, getAllMyStreams)
    .get('/me/badges', authUser, getMyBadges)
    .get('/me/friends', authUser, getMyFriends)
    .post('/me/friends/:friendId', authUser, addFriend) //! params id or friendId¿?¿?¿?
    .delete('/me/friends/:friendId', authUser, removeFriend) //! params id or friendId¿?¿?¿?
    .get('/me/favoriteStreamers', authUser, getMyFavoriteStreamers)
    .post('/me/favoriteStreamers/:favoriteStreamerId', authUser, addFavoriteStreamer)
    .delete('/me/favoriteStreamers/:favoriteStreamerId', authUser, removeFavoriteStreamer)
    .get('/me/favoriteGenres', authUser, getMyFavoriteGenres)
    .post('/me/favoriteGenres/:genreId', authUser, addFavoriteGenre)
    .delete('/me/favoriteGenres/:genreId', authUser, removeFavoriteGenre)
    .put('/me/security/password', authUser, changePassword)

    .get('/:userId', authUser, authAdmin, getOneUser) //! params id or userId¿?¿?¿?
    .post('/:userId/badges/:badgeId', authUser, authAdmin, addBadgeToUser)
    .delete('/:userId/badges/:badgeId', authUser, authAdmin, removeBadgeFromUser)

module.exports = router