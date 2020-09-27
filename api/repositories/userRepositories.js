const User = require('../schemas/userSchema');

const getUserById = (id) => User.findById(id);
const getUserByEmail = (email) => User.findOne({ email });
const createUser = ({ name, email, password }) => {
  const user = new User({ name, email, password });
  return user.save();
};

module.exports = {
  getUserById,
  createUser,
  getUserByEmail,
};
