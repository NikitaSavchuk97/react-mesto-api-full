const jsonwebtoken = require('jsonwebtoken');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const AuthError401 = require('../errors/authError');

module.exports = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return next(new AuthError401('Необходима авторизация'));
  }

  console.log(authToken);

  const token = authToken.replace('Bearer', '');

  let payload;

  try {
    payload = jsonwebtoken.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    return next(new AuthError401('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};
