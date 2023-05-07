const express = require("express");
const propertyController = require("../controllers/property.controller");

const router = express.Router();

router
  .route("/")
  .get(propertyController.getAllProperties)
  .post(propertyController.createProperty);
router
  .route("/:id")
  .get(propertyController.getPropertyDetail)
  .patch(propertyController.updateProperty)
  .delete(propertyController.deleteProperty);

module.exports = router;
