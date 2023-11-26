import { StatusCodes } from 'http-status-codes';

export default class NotFoundError extends Error {
  httpCode = StatusCodes.NOT_FOUND;

  constructor(docType) {
    switch (docType) {
      case 'card':
        super('Не найдена карточка');
        return;
      case 'user':
        super('Не найден пользователь');
        return;
      default:
        super('Не найден элемент');
        return;
    }
  }
}
