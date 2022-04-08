const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: [true, "This badge exists already"]
  },
  points: {
    type: Number,
  }
})

const BadgeModel = mongoose.model('badge', badgeSchema)

module.exports = BadgeModel