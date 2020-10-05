const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards);
  })
  .post(async (req, res) => {
    const board = new Board(req.body);
    await boardsService.create(board);
    res.json(board);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const board = await boardsService.getOne(req.params.id);
    if (board) {
      res.json(board);
    } else {
      res.status(404).send();
    }
  })
  .put(async (req, res) => {
    const board = {
      ...req.body,
      id: req.params.id
    };
    const isUpdated = await boardsService.update(board);
    if (isUpdated) {
      res.json(board);
    } else {
      res.status(400).send();
    }
  })
  .delete(async (req, res) => {
    const board = await boardsService.remove(req.params.id);
    if (board) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  });

module.exports = router;
