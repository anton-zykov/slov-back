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

genitiveRouter.get('/gettask', async (_req, res) => {
  let tasks = await GenitiveTask.find({});
  tasks = tasks.sort(() => Math.random() - 0.5).slice(0, 10);
  tasks.forEach(({ options }) => {
    options.sort(() => Math.random() - 0.5);
  });
  res.json(tasks);
});

// Assign genitive tasks to user.
// genitiveRouter.put('/assign', async (req, res) => {
//   const { username } = req.query;
//   const user = await User.findOne({ username });
// });

module.exports = genitiveRouter;
