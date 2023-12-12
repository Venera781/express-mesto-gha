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
import {validateUrl} from '../helpers.js'

const router = Router();
router.get('/', auth, getAllUser);
router.get('/me', auth, getCurrentUser);
router.get(
  '/:userId',
  auth,
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().hex().length(24),
    }),
  }),
  getUserId,
);
router.patch(
  '/me',
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUser,
);
router.patch(
  '/me/avatar',
  auth,
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .custom(validateUrl),
    }),
  }),
  updateAvatar,
);

export default router;
