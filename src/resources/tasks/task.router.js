const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router
  .route('/:boardId/tasks')
  .get(async (req, res) => {
    const tasks = await tasksService.getAll(req.params.boardId);
    res.status(200).send(tasks);
  })
  .post(async (req, res) => {
    const task = new Task({ ...req.body, boardId: req.params.boardId });
    await tasksService.create(task);
    res.status(200).send(task);
  });

router
  .route('/:boardId/tasks/:taskId')
  .get(async (req, res) => {
    const task = await tasksService.getOne(req.params.boardId, req.params.taskId);
    if (task) {
      res.status(200).send(task);
    } else {
      res.sendStatus(404);
    }
  })
  .put(async (req, res) => {
    const task = {
      ...req.body,
      id: req.params.taskId,
      boardId: req.params.boardId
    };
    const isUpdated = await tasksService.update(task);
    if (isUpdated) {
      res.status(200).send(task);
    } else {
      res.sendStatus(404);
    }
  })
  .delete(async (req, res) => {
    const task = await tasksService.remove(req.params.boardId, req.params.taskId);
    if (task) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });

module.exports = router;
