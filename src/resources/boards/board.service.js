const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();
const getOne = id => boardsRepo.getOne(id);
const create = board => boardsRepo.create(board);
const update = board => boardsRepo.update(board);
const remove = id => {
  const isBoardDeleted = boardsRepo.remove(id);
  if (isBoardDeleted) {
    tasksService.removeByBoardId(id);
  }
  return isBoardDeleted;
};

module.exports = { getAll, create, getOne, update, remove };
