import mongoose from 'mongoose';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const checkErrors = (err, res) => {
  if (
    err instanceof mongoose.Error.CastError ||
    err instanceof mongoose.Error.ValidationError
  ) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      message: `Переданы некорректные данные: ${err.message}`,
    });
  }
  if ('httpCode' in err) {
    return res.status(err.httpCode).send({ message: err.message });
  }
  console.log('Ошибка сервера', err);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
};

export default checkErrors;
