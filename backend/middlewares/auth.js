const jsonwebtoken = require('jsonwebtoken');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const AuthError401 = require('../errors/authError');

module.exports = (req, res, next) => {
	const token = req.cookies.jwt;

	//console.log(token);

	if (!token) {
		return next(new AuthError401('Необходима авторизация'));
	}

	let payload;

	try {
		payload = jsonwebtoken.verify(
			token,
			// eslint-disable-next-line comma-dangle
			NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
		);
	} catch (err) {
		return next(new AuthError401('Необходима авторизация'));
	}

	req.user = payload;

	return next();
};
