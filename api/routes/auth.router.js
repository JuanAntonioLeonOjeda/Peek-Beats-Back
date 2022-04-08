const router = require('express').Router()

const { signup, login } = require('../controllers/auth.controller')

router
    .post('/signup', signup)
    .post('/login', login)

module.exports = router
