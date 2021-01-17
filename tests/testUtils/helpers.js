const mongoose = require('mongoose');

const waitForDB = () => new Promise((resolve, reject) => {
  process.on('DBConnected', () => resolve());
});

const disconnectFromDB = async () => {
  await mongoose.disconnect();
};


module.exports = {
  waitForDB,
  disconnectFromDB
};
