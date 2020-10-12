const router = require('express').Router();
const tasks = require('./task.controller');

router
  .get('/boards/:boardId/tasks', tasks.read)
  .post('/boards/:boardId/tasks', tasks.create)
  .get('/boards/:boardId/tasks/:taskId', tasks.readOne)
  .put('/boards/:boardId/tasks/:taskId', tasks.update)
  .delete('/boards/:boardId/tasks/:taskId', tasks.remove);

module.exports = router;
