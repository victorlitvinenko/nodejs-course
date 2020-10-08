const logger = app => {
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
