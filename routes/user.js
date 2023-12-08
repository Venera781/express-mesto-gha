import { Router } from 'express';
import {
  getAllUser,
  getUserId,
  updateUser,
  updateAvatar,
  getCurrentUser,
} from '../controllers/user.js';
import { auth } from '../middlewares/auth.js';
import { celebrate, Joi } from 'celebrate';
import isURL from 'validator/lib/isURL';

const router = Router();
router.get('/', auth, getAllUser);
router.get('/users/me', auth, getCurrentUser);
router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().alphanum().length(24),
    }),
  }),
  auth,
  getUserId,
);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  auth,
  updateUser,
);
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().validate(isURL),
    }),
  }),
  auth,
  updateAvatar,
);

export default router;
