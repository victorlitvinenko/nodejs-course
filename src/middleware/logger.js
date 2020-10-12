const morgan = require('morgan');

const logger = app => {
  app.use(morgan('dev'));

  app.use((err, req, res, next) => {
    if (err) {
      console.log(`\x1b[31m${err}\x1b[0m`);
      res.sendStatus(500);
      return;
    }
    next(err);
  });

  process.on('uncaughtException', err => {
    console.log(`\x1b[31mCaught exception: ${err}\x1b[0m`);
  });

  process.on('unhandledRejection', reason => {
    console.log(`\x1b[31mUnhandled rejection detected: ${reason.message}\x1b[0m`);
  });
};

module.exports = logger;
