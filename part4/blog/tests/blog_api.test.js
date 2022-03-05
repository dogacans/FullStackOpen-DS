const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const {Blog} = require('../models/Blog')
const User = require('../models/User')

let token; 
beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const userRequest = await api
    .post("/api/users")
    .send(helper.newUser)

  const tokenRequest = await api
    .post('/api/login')
    .send({
      username: helper.newUser.username,
      password: helper.newUser.password
    })

  token = tokenRequest.body.token
  const user = await User.findOne({})
  const blogObjects = helper.initialBlogs.map( blog => new Blog({...blog, user: user}) )
  const promiseArray = blogObjects.map(blog => blog.save())

  await Promise.all(promiseArray)

})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)
    expect(contents).toContain(
        'Go To Statement Considered Harmful')
    })
  

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "get wrecked",
    author: "doga c",
    url: "https://www.fullstackopen.com",
    likes: 0
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(r => r.title)

  expect(contents).toContain(
    'get wrecked'
  )
})

test('blog will not be added if there is no auth header', async () => {
  const newBlog = {
    title: "get wrecked",
    author: "doga c",
    url: "https://www.fullstackopen.com",
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

})

test('blogs have "id" property', async () => {
  const blogs = await helper.blogsInDb()
  expect(blogs[0].id).toBeDefined()
})

test('an invalid blog will not be added', async () => {
  // no author
  const newBlog = {
    title: "get wrecked",
    url: "https://www.fullstackopen.com",
    likes: 0
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  }, 10000
)


test('a blog with no "likes" will have likes: 0', async () => {
  // no author

  const newBlog = {
    title: "ahir",
    url: "https://www.fullstackopen.com",
    author: "dingo"
  }
  
  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toContainEqual(expect.objectContaining({...newBlog, likes: 0}))
    

  }
)

test('a blog submit with no title and url will return 400', async () => {
  // no author

  const newBlog = {
    author: "dingo",
    likes: 0
  }
  
  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    

  }
)

test('a single blog can be deleted using ID', async () => {

    const blogsAtStart = await helper.blogsInDb()

    await api
      .delete(`/api/blogs/${blogsAtStart[0].id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  }
)


test('a single blog can be updated using ID', async () => {

    const blogsAtStart = await helper.blogsInDb()
    const firstBlog = blogsAtStart[0]
    
    const modifiedBlog = {...firstBlog, likes: 69}

    await api
      .put(`/api/blogs/${firstBlog.id}`)
      .send(modifiedBlog)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    
  }
)

afterAll(() => {
  mongoose.connection.close()
})
