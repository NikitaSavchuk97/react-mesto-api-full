const router = require('express').Router();

const {
  getCards,
  likeCard,
  createCard,
  dislikeCard,
  deleteCardById,
} = require('../controllers/cards');

const {
  likeCardValidation,
  createCardValidation,
  dislikeCardValidation,
  deleteCardByIdValidation,
} = require('../middlewares/validations');

router.get('/cards', getCards);
router.post('/cards', createCardValidation, createCard);
router.put('/cards/:cardId/likes', likeCardValidation, likeCard);
router.delete('/cards/:cardId', deleteCardByIdValidation, deleteCardById);
router.delete('/cards/:cardId/likes', dislikeCardValidation, dislikeCard);

module.exports = router;
