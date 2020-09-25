/* eslint-disable no-console */
const UserService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.sendStatus(400);
    await UserService.createUser({ name, email, password });
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
    console.log('getUserByEmailAndPassword -> req.body', req.body);
    if (!email || !password) return res.sendStatus(400);
    const user = await UserService.getUserByEmailAndPassword(email, password);
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
