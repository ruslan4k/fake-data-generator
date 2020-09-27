const mongoose = require('mongoose');

const { Schema } = mongoose;

const dataGenerationSchema = new Schema(
  {
    name: String,
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);

const DataGeneration = mongoose.model('DataGeneration', dataGenerationSchema);

module.exports = DataGeneration;
