const dummy = (blogs) => {
    return 1;
  }
  



const totalLikes = (blogs) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    console.log(blogs.map(blog => blog.likes))
    
    return 0;
}

module.exports = {
    dummy,
    totalLikes,
  }