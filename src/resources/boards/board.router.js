const router = require('express').Router();
const boards = require('./board.controller');

router
  .get('/boards/', boards.read)
  .post('/boards/', boards.create)
  .get('/boards/:id', boards.readOne)
  .put('/boards/:id', boards.update)
  .delete('/boards/:id', boards.remove);

module.exports = router;
