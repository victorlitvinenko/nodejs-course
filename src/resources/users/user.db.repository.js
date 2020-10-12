const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const getOne = async id => {
  return User.findById(id);
};

const create = async user => {
  return User.create(user);
};

const update = async user => {
  return User.findByIdAndUpdate(user.id, user);
};

const remove = async id => {
  return (await User.deleteOne({ _id: id })).deletedCount;
};

module.exports = { getAll, getOne, create, update, remove };
