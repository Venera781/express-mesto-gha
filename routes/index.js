import card from './card.js';
import user from './user.js';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { celebrate, Joi } from 'celebrate';
import { login, createUser } from '../controllers/user.js';
import isEmail from 'validator/lib/isEmail.js';
import isURL from 'validator/lib/isURL.js';

const routes = Router();

//авторизация пользователя
routes.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().validate(isEmail),
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
      avatar: Joi.string().validate(isURL),
      email: Joi.string().required().validate(isEmail),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser,
);
routes.use('/users', user);
routes.use('/cards', card);
routes.use('*', (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send({ message: 'Путь не найден' });
});

export default routes;
