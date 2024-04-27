const mongoose = require('mongoose');

const genitiveTaskSchema = new mongoose.Schema({
  initial: {
    type: String,
    required: true,
  },
  options: [
    {
      word: {
        type: String,
        required: true,
      },
      correct: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
});

genitiveTaskSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.options.forEach((option) => delete option._id);
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Genitive Task', genitiveTaskSchema);
