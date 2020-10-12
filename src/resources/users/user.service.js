const usersRepo = require('./user.db.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();
const getOne = id => usersRepo.getOne(id);
const create = user => usersRepo.create(user);
const update = user => usersRepo.update(user);
const remove = id => {
  const isUserDeleted = usersRepo.remove(id);
  return isUserDeleted && tasksService.resetUserId(id);
};

module.exports = { getAll, getOne, create, update, remove };
