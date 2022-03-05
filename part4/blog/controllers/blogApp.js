const blogAppRouter = require('express').Router()
const { Blog } = require('../models/Blog')
const User = require('../models/User')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

// blogAppRouter.get('/', (request, response) => {
//     response.send('Hello world!!')
// })

blogAppRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)

  })
  
blogAppRouter.post('/', async (request, response) => {
  
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  
  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    author: request.body.author,
    title: request.body.title,
    likes: request.body.likes || 0,
    url: request.body.url,
    user: user._id
    
  })

  const savedNote = await blog.save()

  user.blogs = user.blogs.concat(savedNote._id)
  await user.save()

  response.status(201).json(savedNote)
})
  

blogAppRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogAppRouter.delete('/:id', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  
  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  else {
    response.status(401).json({
      error: 'blog does not belong to token'
    })
  }

})

blogAppRouter.put('/:id', async (request, response) => {

  const blog = {
    author: request.body.author,
    title: request.body.title,
    likes: request.body.likes,
    url: request.body.url
  }
  
  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.status(204).json(updatedNote)
})


module.exports = blogAppRouter
