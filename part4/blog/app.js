const http = require('http')
const express = require('express')
require('express-async-errors');
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const models = require('./models/Blog')
const middleware = require('./utils/middleware')
const blogAppRouter = require('./controllers/blogApp');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');


mongoose.connect(config.MONGODB_URL)
  .then(resp => logger.info('Connected to database!'))
  .catch(error => logger.error("Error occured while connecting to the database!", error))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)
app.use('/api/blogs', middleware.userExtractor, blogAppRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

