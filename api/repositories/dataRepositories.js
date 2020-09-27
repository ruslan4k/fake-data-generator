const DataGeneration = require('../schemas/dataGenerationSchema');

const getHistoryByUserId = (id) => DataGeneration.findById(id);

module.exports = {
  getHistoryByUserId,
};
