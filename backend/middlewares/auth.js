const jsonwebtoken = require('jsonwebtoken');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const AuthError401 = require('../errors/authError');

module.exports = (req, res, next) => {
	const { authorization } = req.headers;

	console.log(authorization);

	if (!authorization) {
		return next(new AuthError401('Необходима авторизация'));
	}

	console.log(authorization)

	const token = authorization.replace('Bearer', '');

	let payload;

	try {
		payload = jsonwebtoken.verify(
			token,
			NODE_ENV === 'production' ? JWT_SECRET : 'yandex',
		);
	} catch (err) {
		return next(new AuthError401('Необходима авторизация'));
	}

	req.user = payload;
	return next();
};
