/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const UserService = require('../services/userService');

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
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
    console.log('getCurrentUser -> user', user);
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
