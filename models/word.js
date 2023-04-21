/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  correctWord: {
    type: String,
    required: true,
  },
  incorrectWord: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: 0,
  },
});

wordSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Word', wordSchema);
