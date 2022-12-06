require('dotenv').config();

const cors = require('cors');
const express = require('express');

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const allowedCors = require('./cors/allowedCors');
const serverError = require('./middlewares/serverError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('*', cors(allowedCors));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(require('./routes/router'));

app.use(errorLogger);
app.use(errors());
app.use(serverError);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
