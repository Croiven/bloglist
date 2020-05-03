const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "blogi",
    author: "joku",
    url: "asd123",
    likes: 3246423,
  },
  {
    title: "blogi2",
    author: "jokunen",
    url: "asd321",
    likes: 3246,
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'blogitesti',
                          author: 'kalle',
                          url: 'www.asd.fi',
                          likes: 420,   })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}