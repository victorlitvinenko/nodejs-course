const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../users/user.model');
const { JWT_SECRET_KEY } = require('../../common/config');
const wrapAsync = require('../../utils/wrapAsync');

const getToken = wrapAsync(async ({ login, password }) => {
  const user = await User.findOne({ login });
  if (!user) {
    return null;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null;
  }
  const token = jwt.sign({ userId: user._id, login }, JWT_SECRET_KEY, { expiresIn: '1h' });
  return token;
});

module.exports = { getToken };
