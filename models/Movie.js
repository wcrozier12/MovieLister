const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  plot: {
    type: String,
    required:true
  },
  ratings: {
    type: [],
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  classic: {
    type: Boolean,
    default: 0
  },
  watched: {
    type: Boolean,
    default: 0,
  }
})

const Movies = mongoose.model('Movie', MovieSchema)

module.exports = Movies;