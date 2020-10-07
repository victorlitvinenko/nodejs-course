const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const getOne = (boardId, taskId) => tasksRepo.getOne(boardId, taskId);
const create = task => tasksRepo.create(task);
const update = task => tasksRepo.update(task);
const remove = (boardId, taskId) => tasksRepo.remove(boardId, taskId);

module.exports = { getAll, create, getOne, update, remove };
