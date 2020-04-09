const dummy = (blogs) => {
    return 1;
  }
  



const totalLikes = (blogs) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const likes = blogs.map(blog => blog.likes)
    return likes.reduce(reducer)
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0) return 0
  if(blogs.length === 1) return {
    title: blogs[0].title,
    author: blogs[0].author,
    likes: blogs[0].likes,
  }
  const likes = blogs.map(blog => blog.likes)
  let largest = likes[0]
  let largestPlace = 0
  for (let i = 1; i < likes.length; i++) {
    if (likes[i] > largest) {
      largest = likes[i]
      largestPlace = i
      
    }
  }

  return {
    title: blogs[largestPlace].title,
    author: blogs[largestPlace].author,
    likes: blogs[largestPlace].likes,
  }
}



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
  }
