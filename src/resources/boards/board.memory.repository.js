const memoryDB = require('../../common/memoryDB');

const getAll = async () => {
  return memoryDB.boards;
};

const getOne = async id => {
  return memoryDB.boards.find(el => el.id === id);
};

const create = async board => {
  memoryDB.boards.push(board);
};

const update = async board => {
  const { id } = board;
  const index = memoryDB.boards.findIndex(el => el.id === id);
  if (index > -1) {
    memoryDB.boards = [...memoryDB.boards.slice(0, index), board, ...memoryDB.boards.slice(index + 1)];
    return true;
  }
  return false;
};

const remove = async id => {
  const index = memoryDB.boards.findIndex(el => el.id === id);
  if (index > -1) {
    memoryDB.boards = memoryDB.boards.filter(board => board.id !== id);
    memoryDB.tasks = memoryDB.tasks.filter(task => task.boardId !== id);
    return true;
  }
  return false;
};

module.exports = { getAll, create, getOne, update, remove };
