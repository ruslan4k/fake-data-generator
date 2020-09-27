/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
// const DataService = require('../services/dataService');

const getHistory = async (req, res, next) => {
  try {
    return res.send({ history: [] });
  } catch (err) {
    return next(err);
  }
};

const addDataGenerationToHistory = async (req, res, next) => {
  try {
    return res.sendStatus(201);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getHistory,
  addDataGenerationToHistory,
};
