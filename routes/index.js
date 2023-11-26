import card from './card.js';
import user from './user.js';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const routes = Router();

routes.use('/users', user);
routes.use('/cards', card);
routes.use('*', (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send({ message: 'Путь не найден' });
});

export default routes;
