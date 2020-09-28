const DataGeneration = require('../schemas/dataGenerationSchema');

const getHistoryByUserId = (id) => DataGeneration.find({ userId: id }).sort({ createdAt: -1 });
const saveDataGenerationEvent = ({ userId, columns, rowsToGenerateNumber }) => {
  const dataGenerationEvent = new DataGeneration({ userId, columns, rowsNumber: rowsToGenerateNumber });
  return dataGenerationEvent.save();
};

module.exports = {
  getHistoryByUserId,
  saveDataGenerationEvent,
};
