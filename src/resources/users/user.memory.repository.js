const memoryDB = require('../../common/memoryDB');

const getAll = async () => {
  return memoryDB.users;
};

const getOne = async id => {
  return memoryDB.users.find(el => el.id === id);
};

const create = async user => {
  memoryDB.users.push(user);
};

const update = async user => {
  const { id } = user;
  const index = memoryDB.users.findIndex(el => el.id === id);
  if (index > -1) {
    memoryDB.users = [...memoryDB.users.slice(0, index), user, ...memoryDB.users.slice(index + 1)];
    return true;
  }
  return false;
};

const remove = async id => {
  const index = memoryDB.users.findIndex(el => el.id === id);
  if (index > -1) {
    memoryDB.users = memoryDB.users.filter(user => user.id !== id);
    memoryDB.tasks = memoryDB.tasks.map(task => (task.userId === id ? { ...task, userId: null } : task));
    return true;
  }
  return false;
};

module.exports = { getAll, getOne, create, update, remove };
