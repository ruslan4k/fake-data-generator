const UserRepository = require('../repositories/userRepositories');
const { hashValue, compareHashAndValue } = require('../helpers/encryptionHelpers');

const getUserById = async (id) => UserRepository.getUserById(id);

const createUser = async ({ name, email, password }) => {
  const hashedPassword = await hashValue(password);
  return UserRepository.createUser({ name, email, password: hashedPassword });
};

const getUserByEmailAndPassword = async (email, password) => {
  const user = await UserRepository.getUserByEmail(email);
  if (!user) return null;
  const hashedPassword = user.password;
  const isValid = compareHashAndValue(password, hashedPassword);
  if (isValid) return user;
  return null;
};

module.exports = {
  createUser,
  getUserByEmailAndPassword,
  getUserById,
};
