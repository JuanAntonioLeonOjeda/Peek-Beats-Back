const mongoose = require('mongoose')

const streamSchema = new mongoose.Schema({
  streamer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  description: {
    type: String,
    default: 'No description'
  },
  date: {
    type: Date,
    default: Date.now()
  },
  duration: {
    type: Number
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'genre',
    required: [true, 'Please insert a music genre']
  },
  currentViewers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  totalViews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  totalViewsOver1min: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  quality: {
    type: String,
    enum: ['low', 'medium', 'high']
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  live: {
    type: Boolean,
    default: true
  },
  room: {
    type: String
  }
})

const StreamModel = mongoose.model('stream', streamSchema)

module.exports = StreamModel