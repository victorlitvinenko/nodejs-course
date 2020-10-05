let users = [];

const getAll = async () => {
  return users;
};

const getOne = async id => {
  return users.find(el => el.id === id);
};

const create = async user => {
  users.push(user);
};

const update = async user => {
  const { id } = user;
  const index = users.findIndex(el => el.id === id);
  if (index > -1) {
    users = [...users.slice(0, index), user, ...users.slice(index + 1)];
    return true;
  }
  return false;
};

const remove = async id => {
  const index = users.findIndex(el => el.id === id);
  if (index > -1) {
    users = users.filter(user => user.id !== id);
    return true;
  }
  return false;
};

module.exports = { getAll, getOne, create, update, remove };
