import { StatusCodes } from 'http-status-codes';

export default class UnauthorizedError extends Error {
  httpCode = StatusCodes.FORBIDDEN;

  constructor() {
    super('Недостаточно прав для операции');
  }
}
