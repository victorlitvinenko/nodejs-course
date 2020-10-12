const router = require('express').Router();
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

router
  .use(userRouter)
  .use(boardRouter)
  .use(taskRouter);

module.exports = router;
