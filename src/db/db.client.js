const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const tcpPortUsed = require('tcp-port-used');
const usersService = require('../resources/users/user.service');
const { PORT, MONGO_CONNECTION_STRING } = require('../common/config');
const { BLACK_FG, RED_FG, BLUE_FG, GREEN_BG, RESET } = require('../common/constants');

mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const connectToDb = app => {
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, `⛔ ${RED_FG}Database connection error:${RESET}`));
  db.once('open', async () => {
    try {
      console.log(`✅ ${BLUE_FG}MongoDB${RESET} connection established.`);
      db.dropDatabase();
      const password = await bcrypt.hash('admin', 12);
      await usersService.create({ name: 'admin', login: 'admin', password });
      tcpPortUsed.check(+PORT).then((inUse) => {
        if (!inUse) {
          app.listen(PORT, () => console.log(`${GREEN_BG}${BLACK_FG}App is running on http://localhost:${PORT}${RESET}`));
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
