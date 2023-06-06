const {
  signUpService,
  findUserByEmail,
  getAllAgentService,
  getAgentByIdService,
} = require("../services/user.service");
const { generateToken } = require("../utils/token");

exports.getAllAgents = async (req, res) => {
  try {
    const { userEmail = "" } = req.query;

    //check if user is valid
    if (userEmail === req.decodedUserEmail) {
      const agents = await getAllAgentService();
      res.status(200).json({
        status: "success",
        agents: agents,
      });
    } else {
      res.status(403).json({
        status: "fail",
        error,
        message: "you are not authorized",
      });
    }
  } catch (error) {
    res.status(401).json({
      status: "fail",
      error,
      message: "you are not authorized",
    });
  }
};
exports.getAgentByID = async (req, res) => {
  const { id } = req.params;
  try {
    const agent = await getAgentByIdService(id);
    res.status(200).json({
      status: "success",
      agent: agent,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
exports.signUp = async (req, res) => {
  try {
    const user = await signUpService(req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully signed up",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        error: "Please provide your credentials",
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "No user found. Please create an account",
      });
    }
    const isPasswordValid = user.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail",
        error: "email or password is incorrect",
      });
    }

    // if (user.status != "active") {
    //   return res.status(401).json({
    //     status: "fail",
    //     error: "Your account is not active yet.",
    //   });
    // }

    const token = generateToken(user);
    const { password: pwd, ...others } = user.toObject();

    res.status(200).json({
      status: "success",
      message: "Successfully logged in",
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
