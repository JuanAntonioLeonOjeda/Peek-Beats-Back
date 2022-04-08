process.stdout.write('\x1B[2J\x1B[0f') // Clear terminal screen

require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const server = require('http').Server(app)
const io = require('socket.io')(server, { origins: '*:*' })


; (async function () {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: process.env.MONGO_DB
    })
    console.log('connected to DB successfully')
  } catch (error) {
    throw new Error(`Error connecting to DB: ${error}`)
  }
})()

const port = process.env.PORT || 5000

try {
  app
    .use(cors())
    .use(morgan('dev'))
    .use(express.json())
    .use(express.static('public'))
    .use('/api', require('./api/routes'))

  server.listen(process.env.PORT, () => {
    console.info('💻 Reboot Server Live')
    console.info(`📡 PORT: http://localhost:${process.env.PORT}`)
  })
} catch (error) {
  throw new Error(`Can't start Express: ${error}`)
}
