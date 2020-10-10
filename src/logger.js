const { finished } = require('stream');
const { RED_FG, YELLOW_FG, GREEN_FG, RESET } = require('./common/constants');

const urlLogger = (req, res, next) => {
  const { method, url, query, body } = req;
  const start = Date.now();
  finished(res, () => {
    const ms = Date.now() - start;
    const { statusCode } = res;
    console.log(
      `${RED_FG}${method}${RESET} ${YELLOW_FG}${url}${RESET} Query:${JSON.stringify(query)} Body:${JSON.stringify(
        body
      )} ${GREEN_FG}${statusCode}${RESET} [${ms}ms]`
    );
  });
  next();
};

const errorLogger = (err, req, res, next) => {
  if (err) {
    console.log(err);
    res.sendStatus(500);
    return;
  }
  next(err);
};

process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`);
});

process.on('unhandledRejection', (reason) => {
  console.log(`Unhandled rejection detected: ${reason.message}`);
});

module.exports = { urlLogger, errorLogger };
