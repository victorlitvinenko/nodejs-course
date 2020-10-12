const tasksRepo = require('./task.db.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const getOne = taskId => tasksRepo.getOne(taskId);
const create = task => tasksRepo.create(task);
const update = task => tasksRepo.update(task);
const remove = (boardId, taskId) => tasksRepo.remove(boardId, taskId);
const removeByBoardId = boardId => tasksRepo.removeByBoardId(boardId);
const resetUserId = id => tasksRepo.resetUserId(id);

module.exports = { getAll, create, getOne, update, remove, removeByBoardId, resetUserId };
