const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => acc + blog.likes ,0)
}


const favoriteBlog = (blogs) => {
    return blogs.reduce((acc, blog) => {
        
        if (blog.likes > acc.likes) 
            return blog
        else 
            return acc
    }, {likes: -1})
}

const mostLikedAuthor = (blogs) => {
    const likes = blogs.reduce((acc, blog) => {
        if (blog.author in acc) {
          acc[blog.author] += blog.likes
        }
        else {
          acc[blog.author] = blog.likes 
        }
        return acc
    },{})
     
    const seperatedObject = _.keys(likes).map(obj => ({author: obj, likes: likes[obj]}) )
  
    const winner = seperatedObject.reduce((acc, obj) => {
      if (obj.likes > acc.likes) {
        return obj
      }
      else {
        return acc
      }
    }, {likes: 0})
    return winner
  }

const mostBlogs = (blogs) => {
    const countedByAuthor = _.countBy(blogs, 'author')
    const index = _.indexOf(_.values(countedByAuthor), _.max(_.values(countedByAuthor)), 0)
    return _.keys(countedByAuthor)[index]
    
    // LEARN LODASH LIBRARY
}
















module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostLikedAuthor,
    mostBlogs
}
  