const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const User = require('../users/user.model');
const wrapAsync = require('../../utils/wrapAsync');

router.post(
  '/login',
  wrapAsync(async (req, res) => {
    const { login, password } = req.body;
    const user = await User.findOne({ login });
    if (!user) {
      return res.sendStatus(403);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.sendStatus(403);
    }
    const token = jwt.sign({ userId: user._id, login }, JWT_SECRET_KEY, { expiresIn: '1h' });
    res.status(200).send({ token });
  })
);

module.exports = router;
