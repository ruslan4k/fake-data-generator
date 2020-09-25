const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      index: true,
      unique: true,
    },
    password: String,
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
