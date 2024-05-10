const stressRouter = require('express').Router();
const StressTask = require('../../models/stressTask');

// Get all stress tasks.
stressRouter.get('/', async (_req, res) => {
  const tasks = await StressTask.find({});
  res.json(tasks);
});

// Create new stress task in the database.
stressRouter.post('/create', async (req, res) => {
  const { newTasks } = req.body;

  const savedNewTasks = await StressTask.insertMany(newTasks);
  res.status(201).json(savedNewTasks);
});

stressRouter.get('/gettask', async (_req, res) => {
  let tasks = await StressTask.find({});
  tasks = tasks.sort(() => Math.random() - 0.5).slice(0, 10);
  tasks.forEach(({ options }) => {
    options.sort(() => Math.random() - 0.5);
  });
  res.json(tasks);
});

// Assign stress tasks to user.
// stressRouter.put('/assign', async (req, res) => {
//   const { username } = req.query;
//   const user = await User.findOne({ username });
// });

module.exports = stressRouter;
