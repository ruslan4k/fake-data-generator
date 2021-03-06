/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const UserService = require('../services/userService');
const CustomError = require('../constants/errors/customError');

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userByEmail = await UserService.getUserByEmail(email);
    if (userByEmail) throw new CustomError('This Email is taken by another account', 409);
    const user = await UserService.createUser({ name, email, password });
    return res.send({ user });
  } catch (err) {
    return next(err);
  }
};

const getUserByEmailAndPassword = async (req, res, next) => {
  try {
    const { user } = req;
    return res.send({ user });
  } catch (err) {
    return next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const { user } = req;
    if (!user) return res.send({ user: null });
    return res.send({ user });
  } catch (err) {
    return next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    await req.logout();
    return res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createUser,
  getUserByEmailAndPassword,
  getCurrentUser,
  logout,
};
