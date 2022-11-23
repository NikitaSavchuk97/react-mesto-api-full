const router = require('express').Router();

const {
  getUsers,
  getUserMe,
  getUserById,
  updateUserById,
  updateAvatarById,
} = require('../controllers/users');

const {
  getUserByIdValidation,
  updateUserByIdValidation,
  updateAvatarByIdValidation,
} = require('../middlewares/validations');

router.get('/users', getUsers);
router.get('/users/me', getUserMe);
router.get('/users/:userId', getUserByIdValidation, getUserById);
router.patch('/users/me', updateUserByIdValidation, updateUserById);
router.patch('/users/me/avatar', updateAvatarByIdValidation, updateAvatarById);

module.exports = router;
