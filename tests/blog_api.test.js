const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)


const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
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


test('blogs have id', async () => {
  const response = await api.get('/api/blogs')
  testId = response.body[0].id
  expect(testId.toBeDefined)


})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: "blogi123",
    author: "joku2",
    url: "asd",
    likes: 3243,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const title = blogsAtEnd.map(n => n.title)
  expect(title).toContain(
    'blogi123'
  )
})

test('likes is 0 if likes isnt given', async () => {
  const newBlog = {
    title: "blogi123",
    author: "joku2",
    url: "asd",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)


  const blogsAtEnd = await helper.blogsInDb()

  const likes = blogsAtEnd.map(n => n.likes)
  expect(likes[blogsAtEnd.length - 1]).toBe(0)
})

test('a unvalid blog can not be added', async () => {
  const newBlog = {
    title: "blogi123",
    author: "jokux10",
    likes: 3243,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

})

afterAll(() => {
  mongoose.connection.close()
})

