const { finished } = require('stream');

const logger = app => {
  app.use((req, res, next) => {
    const { method, url } = req;
    const start = Date.now();
    finished(res, () => {
      const ms = Date.now() - start;
      const { statusCode } = res;
      console.log(`${method} ${url} ${statusCode} [${ms}ms]`);
    });
    next();
  });

  app.use((err, req, res, next) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    next(err);
  });

  process.on('uncaughtException', err => {
    console.log(`Caught exception: ${err}`);
  });

  process.on('unhandledRejection', reason => {
    console.log(`Unhandled rejection detected: ${reason.message}`);
  });
};

module.exports = logger;
