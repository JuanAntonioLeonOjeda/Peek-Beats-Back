const router = require('express').Router()

const { 
  getAllStreams,
  getLiveStreams,
  joinStream,
  createStream,
  updateStream,
  stopStream,
  removeStream
 } = require('../controllers/stream.controller')

const {
  authUser,
  authAdmin
} = require('../utils')

router
  .get('/', authUser, authAdmin, getAllStreams)
  .get('/live', authUser, getLiveStreams)
  .get('/:id', authUser, joinStream)
  .post('/me', authUser, createStream)
  .put('/me', authUser, updateStream)
  .put('/me/stop', authUser, stopStream)
  .delete('/:id', authUser, authAdmin, removeStream)

module.exports = router