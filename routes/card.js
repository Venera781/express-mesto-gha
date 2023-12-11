import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
} from '../controllers/card.js';
import { auth } from '../middlewares/auth.js';
import { celebrate, Joi } from 'celebrate';

const router = Router();

router.get('/', auth, getCards);
router.post(
  '/',
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .uri({ scheme: ['http', 'https'] }),
    }),
  }),
  createCard,
);
router.delete('/:cardId', auth, deleteCard);
router.put('/:cardId/likes', auth, putLike);
router.delete('/:cardId/likes', auth, deleteLike);

export default router;
