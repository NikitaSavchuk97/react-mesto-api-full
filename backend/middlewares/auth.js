const jsonwebtoken = require('jsonwebtoken');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const AuthError401 = require('../errors/authError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  console.log(token);

  if (!token) {
    return next(new AuthError401('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jsonwebtoken.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : '5f81d5d1ef4973f5e0bd2e7190b9bb5c659b596cea6b822e03c5ea4ddb4d8a2d',
    );
  } catch (err) {
    return next(new AuthError401('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};
