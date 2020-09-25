/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const UserService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.sendStatus(400);
    const user = await UserService.createUser({ name, email, password });
    req.session.user = user;
    return res.sendStatus(201);
  } catch (error) {
    console.error('createUser -> error', {
      error, body: req.body, query: req.query, params: req.params,
    });
    return res.sendStatus(500);
  }
};

const getUserByEmailAndPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.sendStatus(400);
    console.log('getUserByEmailAndPassword -> req.session', req.session);
    const user = await UserService.getUserByEmailAndPassword(email, password);
    if (!user) return res.sendStatus(404);
    req.session.user = user;
    return res.send(user);
  } catch (error) {
    console.error('getUserByEmailAndPassword -> error', {
      error, body: req.body, query: req.query, params: req.params,
    });
    return res.sendStatus(500);
  }
};

module.exports = {
  createUser,
  getUserByEmailAndPassword,
};
