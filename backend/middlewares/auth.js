const jsonwebtoken = require('jsonwebtoken');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const AuthError401 = require('../errors/authError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new AuthError401('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer', '');

  let payload;

  try {
    payload = jsonwebtoken.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'b111646aee247940dd9d1cff2ab70f6610b71924af24c6202e09dd00c0d8318c',
    );
  } catch (err) {
    return next(new AuthError401('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};
