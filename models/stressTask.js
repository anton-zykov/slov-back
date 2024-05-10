const mongoose = require('mongoose');

const stressTaskSchema = new mongoose.Schema({
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

stressTaskSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.options.forEach((option) => delete option._id);
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Stress Task', stressTaskSchema);
