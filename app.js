const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const { imagesRouter } = require('./routes');

app.use(bodyParser());
app.use(morgan('tiny'));

app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  })
);

app.use(imagesRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error.',
  });
  next();
});

module.exports = app;
