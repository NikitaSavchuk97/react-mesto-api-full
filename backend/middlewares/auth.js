const jsonwebtoken = require('jsonwebtoken');

const AuthError401 = require('../errors/authError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AuthError401('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jsonwebtoken.verify(token, 'yandex');
  } catch (err) {
    return next(new AuthError401('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};
