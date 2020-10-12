const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersService = require('./user.service');
const User = require('./user.model');
const { JWT_SECRET_KEY } = require('../../common/config');

const logIn = async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ login });
    if (!user) {
      return res.status(403).json({ message: 'Incorrect login or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({ message: 'Incorrect login or password' });
    }
    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );
    res.status(200).send({ token });
  } catch (err) {
    res.json(err);
  }
};

const read = async (req, res) => {
  try {
    const users = await usersService.getAll();
    res.status(200).send(users.map(User.toResponse));
  } catch (err) {
    res.json(err);
  }
};

const create = async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 12);
    const user = await usersService.create({ ...req.body, password });
    res.status(200).send(User.toResponse(user));
  } catch (err) {
    res.json(err);
  }
};

const readOne = async (req, res) => {
  try {
    const user = await usersService.getOne(req.params.id);
    if (user) {
      res.status(200).send(User.toResponse(user));
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.json(err);
  }
};

const update = async (req, res) => {
  try {
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
  } catch (err) {
    res.json(err);
  }
};

const remove = async (req, res) => {
  try {
    const user = await usersService.remove(req.params.id);
    if (user) {
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
  remove,
  logIn
};
