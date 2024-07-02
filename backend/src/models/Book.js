const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date_published: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})

bookSchema.index({ name: 'text', description: 'text' })

module.exports = mongoose.model('Book', bookSchema)