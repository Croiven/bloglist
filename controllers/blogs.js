const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')




const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const token = getTokenFrom(request)
  console.log("toimiiko")
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog.toJSON())
})


blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  console.log(request.params.id)
  console.log(blog.user)

  const token = getTokenFrom(request)

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  console.log(user._id)
  if (blog.user.toString() === user._id.toString()) {

    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  }
  return response.status(401).json({ error: 'wrong token'})
})



blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    likes: body.likes || 0,
  }

  console.log(blog)

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedblog => {
      response.json(updatedblog.toJSON())
    })
    .catch(error => next(error))
})

module.exports = blogsRouter