const Review = require("../models/Review");

exports.createReviewService = async (reviewDetails) => {
  const response = await Review.create(reviewDetails);
  return response;
};
exports.getAllReviews = async () => {
  const response = await Review.find({}).sort({ createdAt: -1 }).populate({
    path: "creator.id",
    select: "name email avatar",
  });

  return response;
};
