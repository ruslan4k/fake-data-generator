const mongoose = require('mongoose');

const DataGeneration = require('../schemas/dataGenerationSchema');

const getHistoryByUserId = async (id, limit, offset) => {
  const { items, itemsCount: itemsCountQueryResult } = (
    await DataGeneration.aggregate([
      {
        $facet: {
          items: [
            { $match: { userId: mongoose.Types.ObjectId(id) } },
            { $sort: { createdAt: -1 } },
            { $skip: offset },
            { $limit: limit },
          ],
          itemsCount: [{ $match: { userId: mongoose.Types.ObjectId(id) } }, { $count: 'count' }],
        },
      },
    ])
  )[0];
  const itemsCount = itemsCountQueryResult[0].count;
  return { items, itemsCount };
};

const saveDataGenerationEvent = ({ userId, columns, rowsToGenerateNumber }) => {
  const dataGenerationEvent = new DataGeneration({ userId, columns, rowsNumber: rowsToGenerateNumber });
  return dataGenerationEvent.save();
};

module.exports = {
  getHistoryByUserId,
  saveDataGenerationEvent,
};
