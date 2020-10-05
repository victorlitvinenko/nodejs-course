let boards = [];

const getAll = async () => {
  return boards;
};

const getOne = async id => {
  return boards.find(el => el.id === id);
};

const create = async board => {
  boards.push(board);
};

const update = async board => {
  const { id } = board;
  const index = boards.findIndex(el => el.id === id);
  if (index > -1) {
    boards = [...boards.slice(0, index), board, ...boards.slice(index + 1)];
    return true;
  }
  return false;
};

const remove = async id => {
  const index = boards.findIndex(el => el.id === id);
  if (index > -1) {
    boards = boards.filter(board => board.id !== id);
    return true;
  }
  return false;
};

module.exports = { getAll, create, getOne, update, remove };
