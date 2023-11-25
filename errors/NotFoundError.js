export default class NotFoundError extends Error {
  code = 404;

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
