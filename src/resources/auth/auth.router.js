const router = require('express').Router();
const wrapAsync = require('../../utils/wrapAsync');
const authService = require('./auth.service');

router.post(
  '/login',
  wrapAsync(async (req, res) => {
    const { login, password } = req.body;
    const token = await authService.getToken({ login, password });
    if (!token) {
      return res.sendStatus(403);
    }
    res.status(200).send({ token });
  })
);

router.all(
  '/login',
  (req, res) => {
    res.status(200).send('Service is running!');
  }
);

module.exports = router;
