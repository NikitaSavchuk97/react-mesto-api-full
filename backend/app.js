require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const serverError = require('./middlewares/serverError');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cors({
  Origin: 'https://snv.mesto.nomoredomains.club',
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
app.get('/', (req, res) => {
  console.log(req.cookies.jwt); // достаём токен
});
*/

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(require('./routes/router'));

app.use(errorLogger);

app.use(errors());
app.use(serverError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
