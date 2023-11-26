import User from '../models/user.js';
import checkErrors from '../errors/checkErrors.js';
import NotFoundError from '../errors/NotFoundError.js';
import { StatusCodes } from 'http-status-codes';

//GET /users — возвращает всех пользователей
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(StatusCodes.OK).send(users);
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
    res.status(StatusCodes.OK).send(userById);
  } catch (err) {
    checkErrors(err, res);
  }
};

//POST /users — создаёт пользователя
export const postUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const newUser = await User.create({ name, about, avatar });
    res.status(StatusCodes.CREATED).send(newUser);
  } catch (err) {
    checkErrors(err, res);
  }
};

const updateUserData = async (res, getUserData) => {
  try {
    const [userId, userData] = getUserData();
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
      runValidators: true,
    }).orFail(() => new NotFoundError('user'));
    res.status(StatusCodes.OK).send(updatedUser);
  } catch (err) {
    checkErrors(err, res);
  }
};

//PATCH /users/me — обновляет профиль
export const updateUser = (req, res) => {
  updateUserData(res, () => {
    const { name, about } = req.body;
    return [req.user._id, { name, about }];
  });
};

//PATCH /users/me/avatar — обновляет аватар
export const updateAvatar = (req, res) => {
  updateUserData(res, () => {
    const { avatar } = req.body;
    return [req.user._id, { avatar }];
  });
};
