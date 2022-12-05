const router = require('express').Router();

const { createUserValidation, loginUserValidation } = require('../middlewares/validations');
const { loginUser, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/notFoundError');
const auth = require('../middlewares/auth');
const routerUsers = require('./users');
const routerCards = require('./cards');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', createUserValidation, createUser);
router.post('/signin', loginUserValidation, loginUser);

router.use(auth);
router.use(routerUsers);
router.use(routerCards);

router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

router.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не существует'));
});

module.exports = router;
