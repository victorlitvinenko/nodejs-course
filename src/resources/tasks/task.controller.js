const tasksService = require('./task.service');

const read = async (req, res) => {
  try {
    const tasks = await tasksService.getAll(req.params.boardId);
    res.status(200).send(tasks);
  } catch (err) {
    res.json(err);
  }
};

const create = async (req, res) => {
  try {
    const task = await tasksService.create({ ...req.body, boardId: req.params.boardId });
    res.status(200).send(task);
  } catch (err) {
    res.json(err);
  }
};

const readOne = async (req, res) => {
  try {
    const task = await tasksService.getOne(req.params.taskId);
    if (task) {
      res.status(200).send(task);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.json(err);
  }
};

const update = async (req, res) => {
  try {
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
  } catch (err) {
    res.json(err);
  }
};

const remove = async (req, res) => {
  try {
    const task = await tasksService.remove(req.params.boardId, req.params.taskId);
    if (task) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  read,
  readOne,
  create,
  update,
  remove
};
