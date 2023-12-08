import mongoose from 'mongoose';
import UnauthorizedError from '../errors/UnauthorizedError.js';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
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
userSchema.statics.findUserByCredentials = async function (email, password) {
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

export default mongoose.model('user', userSchema);
