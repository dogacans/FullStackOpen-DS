const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if( password.length < 3 ) {
        return response.status(400).json( { error: 'password must be longer than 3 characters'})
    } 

    // check if username already exists, return error if so
    const existingUser = await User.findOne({username})
    if (existingUser) {
        return response.status(400).json({
            error: 'username must be unique'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)

})



usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {'title': 1, 'url': 1, 'likes': 1})

    response.status(200).json(users)
})





module.exports = usersRouter