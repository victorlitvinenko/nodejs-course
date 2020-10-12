const boardsService = require('./board.service');

const read = async (req, res) => {
  try {
    const boards = await boardsService.getAll();
    res.status(200).send(boards);
  } catch (err) {
    res.json(err);
  }
};

const create = async (req, res) => {
  try {
    const board = await boardsService.create(req.body);
    res.status(200).send(board);
  } catch (err) {
    res.json(err);
  }
};

const readOne = async (req, res) => {
  try {
    const board = await boardsService.getOne(req.params.id);
    if (board) {
      res.status(200).send(board);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.json(err);
  }
};

const update = async (req, res) => {
  try {
    const board = {
      ...req.body,
      id: req.params.id
    };
    const isUpdated = await boardsService.update(board);
    if (isUpdated) {
      res.status(200).send(board);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    res.json(err);
  }
};

const remove = async (req, res) => {
  try {
    const board = await boardsService.remove(req.params.id);
    if (board) {
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
