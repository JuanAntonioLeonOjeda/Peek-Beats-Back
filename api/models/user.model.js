const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  userName: {
    type: String,
    unique: [true, "This user-name is already in use"],
    required: true
  },
  email: {
    type: String,
    unique: [true, "This email has been register already"],
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
    //MM/DD/YY
  },
  gender: {
    type: String,
    enum: ["male", "female", "undisclosed"],
  },
  bio: {
    type: String,
  },
  socialMedia: [{
    type: String,
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  }],
  favoriteStreamers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  }],
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  }],
  conversations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "conversation",
  }],
  myStreams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "stream",
  }],
  favoriteGenres: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "genre",
  }],
  badges: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "badge",
  }],
  score: {
    type: Number,
  },
  myActivity: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "stream",
  }],
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },
  online: {
    type: Boolean,
    default: false
  },
  live: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
    default: "demoImg",
  },
})

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel