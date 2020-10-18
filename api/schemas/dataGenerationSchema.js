const mongoose = require('mongoose');
const dataTypes = require('../constants/dataTypes');

const { Schema } = mongoose;

const DataColumnSchema = new Schema({
  columnName: { type: String, required: true },
  columnType: { type: String, required: true, enum: dataTypes.map((data) => data.type) },
});

const dataGenerationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    columns: { type: [DataColumnSchema], required: true },
    rowsNumber: { type: Number, required: true },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

const DataGeneration = mongoose.model('DataGeneration', dataGenerationSchema);

module.exports = DataGeneration;
