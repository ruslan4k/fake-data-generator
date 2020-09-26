/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const NotFoundError = require('../constants/errors/notFoundError');
const User = require('../schemas/userSchema');
const UserService = require('../services/userService');

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserService.createUser({ name, email, password });
    console.log('createUser -> user', user);
    req.session.user = user;
    return res.send({ user });
  } catch (err) {
    return next(err);
  }
};

const getUserByEmailAndPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.getUserByEmailAndPassword(email, password);
    if (!user) throw new NotFoundError('Not Valid Credentials');
    req.session.user = user;
    return res.send({ user });
  } catch (err) {
    return next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const { user } = req.session;
    if (!user) return res.send({ user: null });
    const id = user._id;
    const dbUser = await User.findById(id);
    return res.send({ user: dbUser });
  } catch (err) {
    return next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    await req.session.destroy();
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
