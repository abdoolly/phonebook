require('dotenv').config();
require('express-async-errors');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('./config/database');
const indexRouter = require('./routes/index');
const Token = require('./models/Token');
const { seedToken } = require('./services/Bootstrap');
const TokenAuth = require('./middlewares/tokenAuth');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/', TokenAuth, indexRouter);

// seeding an api token in system for use in testing
seedToken();

app.use((err, req, res, next) => {
  res.status(500);
  console.error(err);
  return res.json({ error: err.message });
});

module.exports = app;
