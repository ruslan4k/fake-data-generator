const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const hashValue = async (value) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(value, salt);
  return hash;
};

const compareHashAndValue = async (value, hash) => {
  const result = await bcrypt.compare(value, hash);
  return result;
};

module.exports = {
  hashValue,
  compareHashAndValue,
};
