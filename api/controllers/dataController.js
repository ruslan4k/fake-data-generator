/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */

const CustomError = require('../constants/errors/customError');
const DataService = require('../services/dataService');

const getHistory = async (req, res, next) => {
  try {
    const { user } = req;
    const { page = 0 } = req.query;
    const history = await DataService.getHistoryByUserId(user._id, page);

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

const generateData = async (req, res, next) => {
  try {
    const { user } = req;
    const { columns, rowsToGenerateNumber } = req.body;
    if (columns.length > 50) throw new CustomError('50 is a maximum number of columns', 400);
    if (rowsToGenerateNumber > 30000) throw new CustomError('30,000 is a maximum number of rows', 400);
    const rows = DataService.generateRows(columns, rowsToGenerateNumber);
    let history = { items: [], itemsCount: 0 };
    if (user) {
      await DataService.saveDataGenerationEvent({ userId: user._id, columns, rowsToGenerateNumber });
      history = await DataService.getHistoryByUserId(user._id);
    }
    return res.send({ generatedData: { rows, columns }, history });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getHistory,
  addDataGenerationToHistory,
  generateData,
};
