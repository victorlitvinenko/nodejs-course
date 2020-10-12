const { PORT } = require('./common/config');
const { connectToDb } = require('./db/db.client');
const app = require('./app');

connectToDb(() => {
  app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`));
});

