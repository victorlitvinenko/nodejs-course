const memoryDB = require('../../common/memoryDB');

const getAll = async boardId => {
  return memoryDB.tasks.filter(task => task.boardId === boardId);
};

const getOne = async (boardId, id) => {
  return memoryDB.tasks.find(el => el.boardId === boardId && el.id === id);
};

const create = async task => {
  memoryDB.tasks.push(task);
};

const update = async task => {
  const { id, boardId } = task;
  const index = memoryDB.tasks.findIndex(el => el.id === id && el.boardId === boardId);
  if (index > -1) {
    memoryDB.tasks = [...memoryDB.tasks.slice(0, index), task, ...memoryDB.tasks.slice(index + 1)];
    return true;
  }
  return false;
};

const remove = async (boardId, id) => {
  const index = memoryDB.tasks.findIndex(el => el.id === id && el.boardId === boardId);
  if (index > -1) {
    memoryDB.tasks = memoryDB.tasks.filter(task => task.id !== id);
    return true;
  }
  return false;
};

const removeByBoardId = async id => {
  memoryDB.tasks = memoryDB.tasks.filter(task => task.boardId !== id);
};

module.exports = { getAll, create, getOne, update, remove, removeByBoardId };
