/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const NotFoundError = require('../constants/errors/notFoundError');
const UserService = require('../services/userService');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await UserService.createUser({ name, email, password });
  req.session.user = user;
  return res.sendStatus(201);
};

const getUserByEmailAndPassword = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserService.getUserByEmailAndPassword(email, password);
  if (!user) throw new NotFoundError();
  req.session.user = user;
  return res.send(user);
};

module.exports = {
  createUser,
  getUserByEmailAndPassword,
};
