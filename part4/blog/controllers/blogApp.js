const blogAppRouter = require('express').Router()
const { Blog } = require('../models/Blog')
const logger = require('../utils/logger')

// blogAppRouter.get('/', (request, response) => {
//     response.send('Hello world!!')
// })


blogAppRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  blogAppRouter.post('/', (request, response) => {

    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(error => {
          response.status(400).json(error.message)
        })
  })
  



module.exports = blogAppRouter
