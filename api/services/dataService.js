const DataRepository = require('../repositories/dataRepositories');

const getHistoryByUserId = async (id) => DataRepository.getHistoryByUserId(id);
const saveDataGenerationEvent = async ({ userId, columns, rowsToGenerateNumber }) =>
  DataRepository.saveDataGenerationEvent({ userId, columns, rowsToGenerateNumber });

module.exports = {
  getHistoryByUserId,
  saveDataGenerationEvent,
};
