const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');
const AuthError401 = require('../errors/authError');
const BadRequestError400 = require('../errors/badRequestError');
const ConflictError409 = require('../errors/conflictError');
const NotFoundError404 = require('../errors/notFoundError');

module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials({ email, password })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: 3600 },
      );
      res.cookie(
        'jwt',
        token,
        {
          maxAge: 1800000,
          sameSite: 'none',
          secure: true,
        },
      );
      res.send({ token, message: `Выполнен вход в аккаунт ${user.email}` });
    })
    .catch(() => {
      next(new AuthError401('Неправильные почта или пароль 3'));
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError409('Пользователь с таким email уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError400('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => next(err));
};

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError404('Пользователь по указанному _id не найден'))
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError400('Переданы некорректные данные'));
      } else if (err.kind === 'ObjectId') {
        next(new BadRequestError400('ObjectId! Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => new NotFoundError404('Пользователь по указанному _id не найден'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError400('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserById = (req, res, next) => {
  const owner = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(owner, { name, about }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError404('Пользователь по указанному _id не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError400('Некорректные данные для обновления информации'));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatarById = (req, res, next) => {
  const owner = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(owner, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError400('Некорректные данные для обновления аватара'));
      } else {
        next(err);
      }
    });
};
