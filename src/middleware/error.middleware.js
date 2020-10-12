const chalk = require('chalk');
const error = console.error;

const errorHandler = (err, req, res, next) => {
  if (err) {
    error(`⛔ ${chalk.red(err)}`);
    res.sendStatus(500);
    return;
  }
  next(err);
};

process.on('uncaughtException', (err) => {
  error(`⛔ ${chalk.red(`Caught exception: ${err}`)}`);
});

process.on('unhandledRejection', (reason) => {
  error(`⛔ ${chalk.red(`Unhandled rejection detected: ${reason.message}`)}`);
});

module.exports = errorHandler;
