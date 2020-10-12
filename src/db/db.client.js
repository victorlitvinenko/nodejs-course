const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const tcpPortUsed = require('tcp-port-used');
const chalk = require('chalk');
const log = console.log;
const usersService = require('../resources/users/user.service');
const { PORT, MONGO_CONNECTION_STRING } = require('../common/config');

mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const connectToDb = app => {
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, `⛔ ${chalk.red('Database connection error:')}`));
  db.once('open', async () => {
    try {
      log(`✅ ${chalk.blue('MongoDB')} connection established.`);
      db.dropDatabase();
      const password = await bcrypt.hash('admin', 12);
      await usersService.create({ name: 'admin', login: 'admin', password });
      tcpPortUsed.check(+PORT).then((inUse) => {
        if (!inUse) {
          app.listen(PORT, () => log(chalk.bgGreen.black(`App is running on http://localhost:${PORT}`)));
        } else {
          throw new Error(`Port ${PORT} is busy!`);
        }
      });
    } catch (err) {
      throw new Error(err);
    }
  });
};

module.exports = { connectToDb };
