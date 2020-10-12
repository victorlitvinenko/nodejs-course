const router = require('express').Router();
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const authRouter = require('./resources/auth/auth.router');
const authMiddleware = require('./middleware/auth.middleware');

router
  .use(authRouter)
  .use(authMiddleware, userRouter)
  .use(authMiddleware, boardRouter)
  .use(authMiddleware, taskRouter);

module.exports = router;
