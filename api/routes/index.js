const router = require('express').Router()

const authRouter = require('./auth.router')
const badgeRouter = require('./badge.router')
const userRouter = require('./user.router')
const streamRouter = require('./stream.router')
const genreRouter = require('./genre.router')

router
  .use('/auth', authRouter)
  .use('/badges', badgeRouter)
  .use('/users', userRouter)
  .use('/streams', streamRouter)
  .use('/genres', genreRouter)

module.exports = router;