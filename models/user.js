/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  words: [
    {
      correctWord: {
        type: String,
        required: true,
      },
      incorrectWord: {
        type: String,
        required: true,
      },
      frequency: {
        type: Number,
        default: 1,
        required: true,
      },
    },
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    returnedObject.words.forEach((w) => delete w._id)
    delete returnedObject._id
    delete returnedObject.__v
  // eslint-disable-next-line comma-dangle
  }
})

module.exports = mongoose.model('User', userSchema)
