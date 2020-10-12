const router = require('express').Router();
const bcrypt = require('bcrypt');
const usersService = require('./user.service');
const User = require('./user.model');
const wrapAsync = require('../../utils/wrapAsync');

router
  .get(
    '/users/',
    wrapAsync(async (req, res) => {
      const users = await usersService.getAll();
      res.status(200).send(users.map(User.toResponse));
    })
  )
  .get(
    '/users/:id',
    wrapAsync(async (req, res) => {
      const user = await usersService.getOne(req.params.id);
      if (user) {
        res.status(200).send(User.toResponse(user));
      } else {
        res.sendStatus(404);
      }
    })
  )
  .post(
    '/users/',
    wrapAsync(async (req, res) => {
      const password = await bcrypt.hash(req.body.password, 12);
      const user = await usersService.create({ ...req.body, password });
      res.status(200).send(User.toResponse(user));
    })
  )
  .put(
    '/users/:id',
    wrapAsync(async (req, res) => {
      const password = await bcrypt.hash(req.body.password, 12);
      const user = {
        ...req.body,
        id: req.params.id,
        password
      };
      const isUpdated = await usersService.update(user);
      if (isUpdated) {
        res.status(200).send(User.toResponse(user));
      } else {
        res.sendStatus(400);
      }
    })
  )
  .delete(
    '/users/:id',
    wrapAsync(async (req, res) => {
      const user = await usersService.remove(req.params.id);
      if (user) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    })
  );

module.exports = router;
