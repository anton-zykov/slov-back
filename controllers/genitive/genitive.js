const genitiveRouter = require('express').Router();
const GenitiveTask = require('../../models/genitiveTask');

// Get all genitive tasks.
genitiveRouter.get('/', async (_req, res) => {
  const tasks = await GenitiveTask.find({});
  res.json(tasks);
});

// Create new genitive task in the database.
genitiveRouter.post('/create', async (req, res) => {
  const { newTasks } = req.body;

  const savedNewTasks = await GenitiveTask.insertMany(newTasks);
  res.status(201).json(savedNewTasks);
});

module.exports = genitiveRouter;
