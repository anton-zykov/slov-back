/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  words: [
    {
      word: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Word',
      },
      frequency: {
        type: Number,
        default: 10,
      },
    },
  ],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.words.forEach((w) => delete w._id);
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('User', userSchema);
