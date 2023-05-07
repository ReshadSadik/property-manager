const UserModel = require("../models/User");

exports.signUpService = async (userInfo) => {
  const user = await UserModel.create(userInfo);
  return user;
};
exports.findUserByEmail = async (userEmail) => {
  const user = await UserModel.findOne({ email: userEmail });
  return user;
};
