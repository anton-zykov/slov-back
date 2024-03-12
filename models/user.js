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
  trainings: [
    {
      date: {
        type: Date,
        required: true,
      },
    },
  ],
});

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.words.forEach((w) => delete w._id);
    returnedObject.trainings.forEach((d) => delete d._id);
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('User', userSchema);
