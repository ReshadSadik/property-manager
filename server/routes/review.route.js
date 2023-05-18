const express = require("express");
const reviewController = require("../controllers/review.controller");

const router = express.Router();

router.route("/").get(reviewController.getAllReviews);
router
  .route("/:id")
  .post(reviewController.createReview)
  .patch(reviewController.updateReviewByID);

module.exports = router;
