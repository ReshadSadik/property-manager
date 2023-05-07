const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.route("/:id").get(userController.getUserByID);

module.exports = router;
