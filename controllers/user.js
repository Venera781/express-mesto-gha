import User, { findUserByCredentials } from '../models/user.js';
import NotFoundError from '../errors/NotFoundError.js';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRES, JWT_SECRET } from '../constants/jwt.js';

//GET /users — возвращает всех пользователей
export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(StatusCodes.OK).send(users);
  } catch (err) {
    next(err);
  }
};

//GET /users/:userId - возвращает пользователя по _id
export const getUserId = async (req, res, next) => {
  try {
    const userById = await User.findById(req.params.userId).orFail(
      () => new NotFoundError('user'),
    );
    res.status(StatusCodes.OK).send(userById);
  } catch (err) {
    next(err);
  }
};

//POST /users — создаёт пользователя
export const createUser = async (req, res, next) => {
  try {
    const { name, about, avatar, email, password } = req.body;
    if (password.length < 8) {
      throw new Error('Пароль должен быть не меньше 8 символов');
    }
    const saltRounds = 10;
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    res.status(StatusCodes.CREATED).send({
      name: newUser.name,
      about: newUser.about,
      avatar: newUser.avatar,
      email: newUser.email,
      id: newUser._id,
    });
  } catch (err) {
    next(err);
  }
};

const updateUserData = async (res, next, getUserData) => {
  try {
    const [userId, userData] = getUserData();
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
      runValidators: true,
    }).orFail(() => new NotFoundError('user'));
    res.status(StatusCodes.OK).send(updatedUser);
  } catch (err) {
    next(err);
  }
};

//PATCH /users/me — обновляет профиль
export const updateUser = (req, res, next) => {
  updateUserData(res, next, () => {
    const { name, about } = req.body;
    return [req.user._id, { name, about }];
  });
};

//PATCH /users/me/avatar — обновляет аватар
export const updateAvatar = (req, res, next) => {
  updateUserData(res, next, () => {
    const { avatar } = req.body;
    return [req.user._id, { avatar }];
  });
};

//контроллер аутентификации
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userInDb = await findUserByCredentials(email, password);
    const token = jwt.sign({ _id: userInDb._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES,
    });
    res
      .status(StatusCodes.OK)
      .cookie('jwt', token, {
        maxAge: 7 * 24 * 3600 * 1000,
        httpOnly: true,
        sameSite: true,
      })
      .send();
  } catch (err) {
    next(err);
  }
};

//GET /users/me — возвращает информацию о текущем пользователе
export const getCurrentUser = async (req, res, next) => {
  try {
    const userById = await User.findById(req.user._id).orFail(
      () => new NotFoundError('user'),
    );
    res.status(StatusCodes.OK).send(userById);
  } catch (err) {
    next(err);
  }
};
