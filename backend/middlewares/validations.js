const { celebrate, Joi } = require('celebrate');

const validateUrl = (url) => {
  const regex = /^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/g;
  if (regex.test(url)) {
    return url;
  }
  throw new Error('Invalid url');
};

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateUrl, 'URL'),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const loginUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const getUserByIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
});

const updateUserByIdValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const updateAvatarByIdValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateUrl, 'URL'),
  }),
});

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateUrl, 'URL'),
  }),
});

const deleteCardByIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

const likeCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

const dislikeCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  createUserValidation,
  loginUserValidation,
  getUserByIdValidation,
  updateUserByIdValidation,
  updateAvatarByIdValidation,
  createCardValidation,
  deleteCardByIdValidation,
  likeCardValidation,
  dislikeCardValidation,
};
