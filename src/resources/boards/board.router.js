const router = require('express').Router();
const boardsService = require('./board.service');
const wrapAsync = require('../../utils/wrapAsync');

router
  .get(
    '/boards/',
    wrapAsync(async (req, res) => {
      const boards = await boardsService.getAll();
      res.status(200).send(boards);
    })
  )
  .post(
    '/boards/',
    wrapAsync(async (req, res) => {
      const board = await boardsService.create(req.body);
      res.status(200).send(board);
    })
  )
  .get(
    '/boards/:id',
    wrapAsync(async (req, res) => {
      const board = await boardsService.getOne(req.params.id);
      if (board) {
        res.status(200).send(board);
      } else {
        res.sendStatus(404);
      }
    })
  )
  .put(
    '/boards/:id',
    wrapAsync(async (req, res) => {
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
  )
  .delete(
    '/boards/:id',
    wrapAsync(async (req, res) => {
      const board = await boardsService.remove(req.params.id);
      if (board) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    })
  );

module.exports = router;
