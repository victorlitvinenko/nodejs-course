const { RED_FG, RESET } = require('../common/constants');

const logger = (err, req, res, next) => {
  if (err) {
    console.error(`⛔ ${RED_FG}${err}${RESET}`);
    res.sendStatus(500);
    return;
  }
  next(err);
};

process.on('uncaughtException', (err) => {
  console.error(`⛔ ${RED_FG}Caught exception: ${err}${RESET}`);
});

process.on('unhandledRejection', (reason) => {
  console.error(`⛔ ${RED_FG}Unhandled rejection detected: ${reason.message}${RESET}`);
});

module.exports = logger;
