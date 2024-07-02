const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true,
    index: true
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

bookSchema.index({ name: 'text' })
bookSchema.index({ description: 'text' })

module.exports = mongoose.model('Book', bookSchema)