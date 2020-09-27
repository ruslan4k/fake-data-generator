const DataRepository = require('../repositories/dataRepositories');

const getHistoryByUserId = async (id) => DataRepository.getUserById(id);

module.exports = {
  getHistoryByUserId,
};
