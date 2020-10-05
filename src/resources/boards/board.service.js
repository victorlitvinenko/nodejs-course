const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const getOne = id => boardsRepo.getOne(id);
const create = board => boardsRepo.create(board);
const update = board => boardsRepo.update(board);
const remove = id => boardsRepo.remove(id);

module.exports = { getAll, create, getOne, update, remove };
