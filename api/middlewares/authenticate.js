const UserService = require('../services/userService');

const authenticate = async (
  req,
  res,
  next,
) => {
  try {
    const { user } = req.session;
    if (!user) return res.send({ user: null });
    const id = user._id;
    const dbUser = await UserService.getUserById(id);
    if (!dbUser) req.session.user = null;
    req.user = dbUser;
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = authenticate;
