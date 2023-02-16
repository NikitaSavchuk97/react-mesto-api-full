require('dotenv').config();
const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const allowedCors = require('./cors/allowedCors');

const serverError = require('./middlewares/serverError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
	PORT = 3000,
	NODE_ENV,
	MESTO_DB,
	DEFAULT_DB = 'mongodb://localhost:27017/mesto-db-local',
} = process.env;

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect(NODE_ENV === 'production' ? MESTO_DB : DEFAULT_DB);

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
