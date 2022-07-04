const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

let count = 0
const config = require('./utils/config')
const commentsRouter = require('./controllers/comments')

const app = express()

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    count += 1
    req.count = count
  }
  next()
})

app.use('/api/comments', commentsRouter)

module.exports = app
