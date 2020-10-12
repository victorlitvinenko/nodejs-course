const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    res.status(200).send(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    const user = await usersService.create(req.body);
    res.status(200).send(User.toResponse(user));
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const user = await usersService.getOne(req.params.id);
    if (user) {
      res.status(200).send(User.toResponse(user));
    } else {
      res.sendStatus(404);
    }
  })
  .put(async (req, res) => {
    const user = {
      ...req.body,
      id: req.params.id
    };
    const isUpdated = await usersService.update(user);
    if (isUpdated) {
      res.status(200).send(User.toResponse(user));
    } else {
      res.sendStatus(400);
    }
  })
  .delete(async (req, res) => {
    const user = await usersService.remove(req.params.id);
    if (user) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });

module.exports = router;
