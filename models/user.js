import mongoose from 'mongoose';
import UnauthorizedError from '../errors/UnauthorizedError.js';
import bcrypt from 'bcryptjs';
import isURL from 'validator/lib/isURL.js';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: isURL,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

const User = mongoose.model('user', userSchema);

export default User;
export const findUserByCredentials = async function (email, password) {
  const userInDb = await User.findOne({ email }).select('+password');
  if (!userInDb) {
    throw new UnauthorizedError();
  }
  const matched = await bcrypt.compare(password, userInDb.password);
  if (!matched) {
    throw new UnauthorizedError();
  }
  delete userInDb.password;
  return userInDb;
};
