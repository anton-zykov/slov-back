const mainRouter = require('express').Router()
const User = require('../models/user')

mainRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

mainRouter.post('/', async (request, response) => {
  const { username, words } = request.body

  const newUser = new User({
    username,
    words,
  })

  const savedUser = await newUser.save()
  response.status(201).json(savedUser)
})

mainRouter.put('/', async (request, response) => {
  const { username, word, freqChange, words } = request.body
  if (freqChange) {
    const dbUser = await User.findOne({ username })
    const updatedWords = dbUser.words.map((w) => {
      if (w.correctWord === word) {
        return {
          correctWord: w.correctWord,
          incorrectWord: w.incorrectWord,
          frequency: Math.round((w.frequency + freqChange) * 10) / 10,
        }
      }
      return w
    })

    const updated = await User.findOneAndUpdate(
      { username },
      { words: updatedWords },
      { new: true },
    )
    response.json(updated)
  } else {
    const dbUser = await User.findOne({ username })
    const updatedWords = dbUser.words.concat(words)
    const updated = await User.findOneAndUpdate(
      { username },
      { words: updatedWords },
      { new: true },
    )
    response.json(updated)
  }
})

module.exports = mainRouter
