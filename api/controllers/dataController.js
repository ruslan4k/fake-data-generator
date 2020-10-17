/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const DataService = require('../services/dataService');

const getHistory = async (req, res, next) => {
  try {
    const { user } = req;
    const history = await DataService.getHistoryByUserId(user._id);
    return res.send({ history });
  } catch (err) {
    return next(err);
  }
};

const addDataGenerationToHistory = async (req, res, next) => {
  try {
    const { columns, rowsToGenerateNumber } = req.body;
    const { user } = req;
    await DataService.saveDataGenerationEvent({ userId: user._id, columns, rowsToGenerateNumber });
    const history = await DataService.getHistoryByUserId(user._id);
    return res.send({ history });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getHistory,
  addDataGenerationToHistory,
};
