export default class UnauthorizedError extends Error {
  code = 403;

  constructor() {
    super('Недостаточно прав для операции');
  }
}
