import User from '../models/user.js';
import checkErrors from '../errors/checkErrors.js';
import NotFoundError from '../errors/NotFoundError.js';

//GET /users — возвращает всех пользователей
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    checkErrors(err, res);
  }
};

//GET /users/:userId - возвращает пользователя по _id
export const getUserId = async (req, res) => {
  try {
    const userById = await User.findById(req.params.userId).orFail(
      () => new NotFoundError('user'),
    );
    res.status(200).send(userById);
  } catch (err) {
    checkErrors(err, res);
  }
};

//POST /users — создаёт пользователя
export const postUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const newUser = await User.create({ name, about, avatar });
    res.status(200).send(newUser);
  } catch (err) {
    checkErrors(err, res);
  }
};

//PATCH /users/me — обновляет профиль
export const updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;
    const updateProfile = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        about,
      },
      { new: true },
    ).orFail(() => new NotFoundError('user'));
    res.status(200).send(updateProfile);
  } catch (err) {
    checkErrors(err, res);
  }
};
//PATCH /users/me/avatar — обновляет аватар
export const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const newPicAvatar = await User.findByIdAndUpdate(
      req.user._id,
      {
        avatar,
      },
      { new: true },
    ).orFail(() => new NotFoundError('user'));
    res.status(200).send(newPicAvatar);
  } catch (err) {
    checkErrors(err, res);
  }
};
