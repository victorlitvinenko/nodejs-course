const router = require('express').Router();
const users = require('./user.controller');

router
  .get('/users/', users.read)
  .get('/users/:id', users.readOne)
  .post('/users/', users.create)
  .put('/users/:id', users.update)
  .delete('/users/:id', users.remove)
  .post('/login', users.logIn);

module.exports = router;
