const Task = require('./task.model');

const getAll = async boardId => {
  return Task.find({ boardId });
};

const getOne = async id => {
  return Task.findById(id);
};

const create = async task => {
  return Task.create(task);
};

const update = async task => {
  return Task.findByIdAndUpdate(task.id, task);
};

const remove = async (boardId, id) => {
  return (await Task.deleteOne({ _id: id })).deletedCount;
};

const removeByBoardId = async id => {
  return Task.deleteMany({ boardId: id });
};

const resetUserId = async id => {
  return Task.updateMany({ userId: id }, { $set: { userId: null } });
};

module.exports = { getAll, create, getOne, update, remove, removeByBoardId, resetUserId };
