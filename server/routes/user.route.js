const express = require('express');
const userController = require('../controllers/user.controller');
const verifyUserToken = require('../middlewares/verifyRequest');

const router = express.Router();

router
  .route('/')
  .get(verifyUserToken, userController.getAllAgents)
  .post(userController.createUser);
router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.route('/:id').get(userController.getAgentByID); // get user by a specific id

module.exports = router;
