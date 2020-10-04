const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    const user = new User(req.body);
    await usersService.create(user);
    res.json(User.toResponse(user));
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const user = await usersService.getOne(req.params.id);
    if (user) {
      res.json(User.toResponse(user));
    } else {
      res.status(404).send();
    }
  })
  .put(async (req, res) => {
    const user = {
      ...req.body,
      id: req.params.id
    };
    await usersService.update(user);
    res.json(User.toResponse(user));
  })
  .delete(async (req, res) => {
    const user = await usersService.remove(req.params.id);
    if (user) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  });

module.exports = router;
