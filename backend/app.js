require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const serverError = require('./middlewares/serverError');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

const allowedCors = {
	origin: [
		'http://localhost:3000',
		'https://localhost:3000',
		'http://localhost:3001',
		'https://localhost:3001',
		'http://snv.mesto.nomoredomains.club',
		'https://snv.mesto.nomoredomains.club',
		'http://api.snv.mesto.nomoredomains.club',
		'https://api.snv.mesto.nomoredomains.club',
	],
	methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
	preflightContinue: false,
	optionsSuccessStatus: 204,
	allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'cookies'],
	credentials: true,
};

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
