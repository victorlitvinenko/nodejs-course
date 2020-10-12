const Board = require('./board.model');

const getAll = async () => {
  return Board.find({});
};

const getOne = async id => {
  return Board.findById(id);
  // return Board.findOne({ _id: id });
};

const create = async board => {
  return Board.create(board);
};

const update = async board => {
  return Board.findByIdAndUpdate(board.id, board);
};

const remove = async id => {
  return (await Board.deleteOne({ _id: id })).deletedCount;
};

module.exports = { getAll, create, getOne, update, remove };
