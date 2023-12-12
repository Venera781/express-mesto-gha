import { StatusCodes } from 'http-status-codes';

export default class BadRequestError extends Error {
  httpCode = StatusCodes.BAD_REQUEST;

  constructor() {
    super('Переданы некорректные данные');
  }
}
