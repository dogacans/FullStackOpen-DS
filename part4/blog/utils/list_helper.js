const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => acc + blog.likes ,0)
}


const favoriteBlog = (blogs) => {
    return blogs.reduce((acc, blog) => {
        console.log(acc.likes)
        if (blog.likes > acc.likes) 
            return blog
        else 
            return acc
    }, {likes: 0})
}

const mostLikedAuthor = (blogs) => {
    const grouped = _.groupBy(blogs, 'author')

    // LEARN LODASH LIBRARY
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostLikedAuthor
}
  