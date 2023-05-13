const User = require("../models/User");

exports.getAllAgentService = async () => {
  const agents = await User.find({});
  return agents;
};
exports.getAgentByIdService = async (id) => {
  const agent = await User.findOne({ _id: id }).populate("allProperties");
  return agent;
};
exports.signUpService = async (agentInfo) => {
  const agent = await User.create(agentInfo);
  return agent;
};
exports.findUserByEmail = async (agentEmail) => {
  const agent = await User.findOne({ email: agentEmail });
  return agent;
};
