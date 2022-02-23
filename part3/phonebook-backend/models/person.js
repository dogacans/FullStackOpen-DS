const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,

    minLength: 2,
    required: true },
  number: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /\d{2,3}-\d{5,}/.test(v),
      message: props => `${props.value} is not a valid phone number.
                                  Example: 090-123456`
    },
    minLength: 8
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v

  }
})

module.exports = mongoose.model('Person', personSchema)








































