import { StatusCodes } from 'http-status-codes';

export default class ConflictError extends Error {
  httpCode = StatusCodes.CONFLICT;

  constructor() {
    super('Пользователь уже существует');
  }
}