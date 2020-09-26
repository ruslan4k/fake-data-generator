const User = require('../schemas/userSchema');
const { hashValue, compareHashAndValue } = require('../helpers/encryptionHelpers');

const createUser = async ({ name, email, password }) => {
  const hashedPassword = await hashValue(password);
  const user = new User({ name, email, password: hashedPassword });
  return user.save();
};

const getUserByEmailAndPassword = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) return null;
  const hashedPassword = user.password;
  const isValid = compareHashAndValue(password, hashedPassword);
  if (isValid) return user;
  return null;
};

module.exports = {
  createUser,
  getUserByEmailAndPassword,
};
