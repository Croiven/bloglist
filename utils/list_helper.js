const dummy = (blogs) => {
    return 1;
  }
  



const totalLikes = (blogs) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const likes = blogs.map(blog => blog.likes)
    return likes.reduce(reducer)
}

module.exports = {
    dummy,
    totalLikes,
  }