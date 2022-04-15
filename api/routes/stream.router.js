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
  .post('/me', authUser, createStream)
  .post('/:id', authUser, joinStream)
  .put('/me', authUser, updateStream)
  .put('/me/stop', authUser, stopStream)
  .delete('/:id', authUser, authAdmin, removeStream)

module.exports = router