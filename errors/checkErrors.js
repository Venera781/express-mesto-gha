import mongoose from 'mongoose';

const checkErrors = (err, res) => {
  if (
    err instanceof mongoose.Error.CastError ||
    err instanceof mongoose.Error.ValidationError
  ) {
    return res.status(400).send({
      message: `Переданы некорректные данные: ${err.message}`,
    });
  }
  res.status(err.code ?? 500).send({ message: err.message });
};

export default checkErrors;
