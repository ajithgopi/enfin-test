require('dotenv').config()
const express = require('express')
const connectDB = require('./src/config/mongodb')

const app = express()

connectDB()

app.use(express.json())

app.use('/api/books', require('./src/routes/bookRoutes'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})