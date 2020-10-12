const mongoose = require('mongoose');
const { PORT, MONGO_CONNECTION_STRING } = require('../common/config');

mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const connectToDb = app => {
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, '⛔ \x1b[31mDatabase connection error:\x1b[0m'));
  db.once('open', () => {
    console.log('✅ \x1b[34mMongoDB\x1b[0m connection established.');
    app.listen(PORT, () => console.log(`\x1b[42m\x1b[30mApp is running on http://localhost:${PORT}\x1b[0m`));
  });
};

module.exports = { connectToDb };
