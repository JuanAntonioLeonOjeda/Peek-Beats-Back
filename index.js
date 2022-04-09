process.stdout.write('\x1B[2J\x1B[0f') // Clear terminal screen

require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const server = require('http').Server(app)
const io = require('socket.io')(server,
  { cors: {
    origin:'https://peek-beats.netlify.app' }
  }
)

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
const room = {}

try {
  app
    .use(cors('https://peek-beats.netlify.app'))
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

io.on('connection', function(socket) {
  console.log(socket.id + ' has connected')
  console.log('room: ' + room)

  socket.on('message', data => {
    console.log('message: ' + data)
      data = JSON.parse(data)
      console.log('message: ' + data)
      if (!room[data.room]) {
          room[data.room] = [socket.id]
      } else if (room[data.room].length < 2) {
          if (room[data.room].filter(i => i === socket.id).length === 0) {
              room[data.room].push(socket.id)
          }
      }
      if (room[data.room].length === 2) {
          for (s of room[data.room]) {
              if (s !== socket.id && io.sockets.sockets[s] && room[data.room].length <= 2) {
                  io.sockets.sockets[s].emit('message', data.data)
              }
          }
      }
  })

  socket.on('join', (roomId) => {
      console.log('join: ' + roomId)
      if (room[roomId] && room[roomId].length === 2) {
          socket.emit('reject', { error: 'Room is full' })
      }
  })

  socket.on('leave', (roomId) => {
      console.log('leave: ' + roomId)
      for (s in room) {
          for (let i = 0; i < room[s].length; i++) {
              if (room[s][i] === roomId) {
                  room[s].splice(i, 1)
                  if (room[s].length == 0) {
                      delete room[s]
                  }
                  break
              }
          }
      }
      console.log(room)
  })

  socket.on('disconnect', () => {
      console.log(socket.id + ' has been disconnected')
      for (s in room) {
          for (let i = 0; i < room[s].length; i++) {
              if (room[s][i] === socket.id) {
                  room[s].splice(i, 1)
                  if (room[s].length == 0) {
                      delete room[s]
                  }
                  break
              }
          }
      }
      console.log(room)
  })
});