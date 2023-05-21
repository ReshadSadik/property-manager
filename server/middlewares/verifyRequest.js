const jwt = require("jsonwebtoken");

const verifyUserToken = async (req, res, next) => {
  if (req.headers?.authorization?.startsWith("Bearer ")) {
    const authToken = req.headers.authorization.split("Bearer ")[1];
    try {
      const decodedUser = await jwt.decode(authToken);
      req.decodedUserEmail = await decodedUser.email;
    } catch (error) {}
  }
  next();
};

module.exports = verifyUserToken;
