const express = require('express')
const Person = require('./models/person')

const app = express()
app.use(express.json())

const morgan = require('morgan')
app.use(morgan('tiny'))

const cors = require('cors')

app.use(cors())

app.use(express.static('build'))


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => {
    response.json(result)
  })
})

app.get('/info', (request, response) => {
  console.log('got req for info!')
  Person.find({}).then(result => {
    response.send(
      `Phonebook has info for ${result.length} people.<br/>
      ${new Date()}`)
  })

})

app.get('/api/persons/:id', (request, response, next) => {

  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => {
      next(error)
      // response.status(500).end()
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id).then(person => {

    if(person) {
      response.status(204).end()
    }
    else {
      response.status(404).end()
    }
  })
    .catch(error => {
      next(error)
    })
})



app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    console.log('response.json(savedPerson)')
    response.json(savedPerson)
  })
    .catch(error => {
    // console.log(error)
      next(error)})

  // persons = persons.concat(person)
})

app.put('/api/persons/:id', (request, response, next) => {

  const person = {
    name: request.body.name,
    number: request.body.number
  }

  console.log('reqbody', request.body)

  Person.findByIdAndUpdate(request.params.id, person,
    { new: true, runValidators: true, context: 'query' })
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    // response.status(500).end()
    })
})



const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  else if (error.name === 'ValidationError') {
    console.log({ error: error.message })
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

