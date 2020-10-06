const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.status(200).send(boards);
  })
  .post(async (req, res) => {
    const board = new Board(req.body);
    await boardsService.create(board);
    res.status(200).send(board);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const board = await boardsService.getOne(req.params.id);
    if (board) {
      res.status(200).send(board);
    } else {
      res.sendStatus(404);
    }
  })
  .put(async (req, res) => {
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
  })
  .delete(async (req, res) => {
    const board = await boardsService.remove(req.params.id);
    if (board) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });

module.exports = router;
