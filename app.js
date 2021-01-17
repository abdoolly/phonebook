require('dotenv').config();
require('express-async-errors');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('./config/database');
const indexRouter = require('./routes/index');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/', indexRouter);

app.use((err, req, res, next) => {
  res.status(500);
  console.error(err);
  return res.json({ message: err.message });
});

module.exports = app;
