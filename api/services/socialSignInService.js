const UserRepository = require('../repositories/userRepositories');

const handlePassportSocialSignIn = async (profile, cb) => {
  const { displayName } = profile;
  const { email } = profile._json;
  let user;
  if (email) {
    user = await UserRepository.getUserByEmail(email);
  }

  if (!user) user = await UserRepository.createUser({ name: displayName, email });

  cb(null, user);
};

module.exports = { handlePassportSocialSignIn };
