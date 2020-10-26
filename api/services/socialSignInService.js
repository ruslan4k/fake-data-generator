const UserRepository = require('../repositories/userRepositories');
const NotFoundError = require('../constants/errors/notFoundError');

const handlePassportSocialSignIn = async (profile, cb) => {
  try {
    const { displayName } = profile;
    const { email } = profile._json;
    if (!email) {
      return cb(new NotFoundError('Email is a Required field'), null);
    }
    let user;
    if (email) {
      user = await UserRepository.getUserByEmail(email);
    }

    if (!user) user = await UserRepository.createUser({ name: displayName, email });

    return cb(null, user);
  } catch (error) {
    return cb(error, null);
  }
};

module.exports = { handlePassportSocialSignIn };
