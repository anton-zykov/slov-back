const mongoose = require('mongoose');
const mainRouter = require('express').Router();
const User = require('../models/user');
const Word = require('../models/word');

/* Getting user words. */
mainRouter.get('/', async (request, response) => {
  const { username, all, trainingTimes } = request.query;

  const user = await User.findOne({ username }).populate('words.word');

  const selectTen = (words) => {
    let totalFrequency = words.reduce((sum, word) => sum + word.frequency, 0);
    let currentWords = words;
    const chosenWords = [];
    for (let i = 1; i <= 4; i += 1) { // 2 should be changed to 10.
      const randomFr = Math.floor(Math.random() * totalFrequency + 1);
      let currentFr = 0;
      for (let j = 0; j < currentWords.length; j += 1) {
        const w = currentWords[j];
        currentFr += w.frequency;
        if (currentFr >= randomFr) {
          chosenWords.push(w);
          totalFrequency -= w.frequency;
          currentWords = currentWords.filter((_value, index) => index !== j);
          break;
        }
      }
    }
    return chosenWords;
  };

  if (trainingTimes === 'true') response.json(user.trainings);
  else if (all === 'true') response.json(user.words);
  else {
    response.json(selectTen(user.words));
  }
});

/* Check if user exists. */
mainRouter.get('/users', async (request, response) => {
  const { username } = request.query;
  const user = await User.exists({ username });
  response.json(!!user);
});

/* Creating new user. */
mainRouter.post('/users', async (request, response) => {
  const { username } = request.body;
  const newUser = new User({ username });

  const savedUser = await newUser.save();
  response.status(201).json(savedUser);
});

/* Creating new words. */
mainRouter.post('/words', async (request, response) => {
  const { newWords } = request.body;

  const savedNewWords = await Word.insertMany(newWords);
  response.status(201).json(savedNewWords);
});

/* Assigning words to user. */
mainRouter.put('/users', async (request, response) => {
  const { username } = request.query;
  const { newWordsIDs } = request.body;
  const user = await User.findOne({ username });

  user.words = user.words.concat(newWordsIDs.map((id) => ({ word: mongoose.Types.ObjectId(id) })));
  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

/* Checking user answers, changing frequencies, returning results and correct answers. */
mainRouter.put('/', async (request, response) => {
  const { username } = request.query;
  const { userWords } = request.body; // userWords = [{ userAnswer, id }]

  const user = await User.findOne({ username }).populate('words.word');
  user.trainings.unshift({ date: new Date() });

  response.json(
    userWords.map((userWord) => {
      const currentWord = user.words.find((word) => word.word.id === userWord.id);
      const correct = currentWord.word.correctWord === userWord.userAnswer;

      currentWord.frequency += correct ? -1 : 5;
      if (currentWord.frequency < 3) currentWord.frequency = 3;

      return {
        id: userWord.id,
        correct,
        correctWord: currentWord.word.correctWord,
      };
    })
  );

  await user.save();
});

module.exports = mainRouter;
