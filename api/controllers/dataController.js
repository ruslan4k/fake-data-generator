/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const DataService = require('../services/dataService');

const getHistory = async (req, res, next) => {
  try {
    const { userId } = req;
    let history = [];
    if (userId) history = await DataService.getHistoryByUserId(userId);
    return res.send({ history });
  } catch (err) {
    return next(err);
  }
};

const addDataGenerationToHistory = async (req, res, next) => {
  const { columns, rowsToGenerateNumber } = req.body;
  const { userId } = req;
  if (userId) {
    await DataService.saveDataGenerationEvent({ userId, columns, rowsToGenerateNumber });
    const history = await DataService.getHistoryByUserId(userId);
    return res.send({ history });
  }
  try {
    return res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getHistory,
  addDataGenerationToHistory,
};
