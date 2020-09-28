const DataGeneration = require('../schemas/dataGenerationSchema');

const getHistoryByUserId = (id) => DataGeneration.find({ userId: id });
const saveDataGenerationEvent = ({ userId, columns, rowsToGenerateNumber }) => {
  const dataGenerationEvent = new DataGeneration({ userId, columns, rowsNumber: rowsToGenerateNumber });
  return dataGenerationEvent.save();
};

module.exports = {
  getHistoryByUserId,
  saveDataGenerationEvent,
};
