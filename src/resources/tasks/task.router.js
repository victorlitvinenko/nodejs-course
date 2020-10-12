const router = require('express').Router();
const tasksService = require('./task.service');
const wrapAsync = require('../../utils/wrapAsync');

router
  .get(
    '/boards/:boardId/tasks',
    wrapAsync(async (req, res) => {
      const tasks = await tasksService.getAll(req.params.boardId);
      res.status(200).send(tasks);
    })
  )
  .post(
    '/boards/:boardId/tasks',
    wrapAsync(async (req, res) => {
      const task = await tasksService.create({ ...req.body, boardId: req.params.boardId });
      res.status(200).send(task);
    })
  )
  .get(
    '/boards/:boardId/tasks/:taskId',
    wrapAsync(async (req, res) => {
      const task = await tasksService.getOne(req.params.taskId);
      if (task) {
        res.status(200).send(task);
      } else {
        res.sendStatus(404);
      }
    })
  )
  .put(
    '/boards/:boardId/tasks/:taskId',
    wrapAsync(async (req, res) => {
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
  )
  .delete(
    '/boards/:boardId/tasks/:taskId',
    wrapAsync(async (req, res) => {
      const task = await tasksService.remove(req.params.boardId, req.params.taskId);
      if (task) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    })
  );

module.exports = router;
