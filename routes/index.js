import card from './card.js';
import user from './user.js';
import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { login, createUser } from '../controllers/user.js';
import NotFoundError from '../errors/NotFoundError.js';

const routes = Router();

//авторизация пользователя
routes.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);
//регистрация пользователя
routes.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().uri({ scheme: ['http', 'https'] }),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser,
);
routes.use('/users', user);
routes.use('/cards', card);
routes.use('*', (req, res, next) => {
  next(new NotFoundError('path'));
});

export default routes;
