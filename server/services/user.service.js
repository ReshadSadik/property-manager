const User = require("../models/User");

exports.getAllAgentService = async () => {
  const users = await User.find({});
  return users;
};
exports.signUpService = async (userInfo) => {
  const user = await User.create(userInfo);
  return user;
};
exports.findUserByEmail = async (userEmail) => {
  const user = await User.findOne({ email: userEmail });
  return user;
};
