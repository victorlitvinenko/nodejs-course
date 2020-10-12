const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../users/user.model');
const { JWT_SECRET_KEY } = require('../../common/config');

const logIn = async (req, res) => {
  try {
    const { id, login, password } = req.body;
    const user = await User.findOne({ login });
    if (!user) {
      return res.sendStatus(403);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.sendStatus(403);
    }
    const token = jwt.sign(
      { userId: id, login },
      JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );
    res.status(200).send({ token });
  } catch (err) {
    res.json(err);
  }
};

module.exports = { logIn };
