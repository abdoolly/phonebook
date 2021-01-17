const mongoose = require('mongoose');
const Token = require('../../models/Token');
const { seedToken } = require('../../services/Bootstrap');

const waitForDB = () => new Promise((resolve, reject) => {
  process.on('DBConnected', () => resolve());
});

const seedDB = async () => {
  await Token.create({ token: 'test_token' });
};

const disconnectFromDB = async () => {
  await mongoose.disconnect();
};


module.exports = {
  waitForDB,
  disconnectFromDB,
  seedDB,
};
