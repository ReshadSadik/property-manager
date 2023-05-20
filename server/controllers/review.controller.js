const User = require("../models/User");
const Property = require("../models/Property");
const mongoose = require("mongoose");

const {
  createReviewService,
  getAllReviews,
} = require("../services/review.service");
const Review = require("../models/Review");

exports.getAllReviews = async (req, res) => {
  const reviews = await getAllReviews();
  try {
    res.status(200).json({
      status: "success",
      message: "Review received successfully",
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

exports.createReview = async (req, res) => {
  const { id } = req.params;
  const { message, rating, status = "rejected", email } = req.body;

  try {
    // start a new session
    const session = await mongoose.startSession();
    session.startTransaction();
    // get user
    const user = await User.findOne({ email }).session(session);
    if (!user) throw new Error("User not found");
    // get property
    const property = await Property.findOne({ _id: id }).session(session);
    if (!property) throw new Error("property not found");

    const newReview = await createReviewService({
      message,
      rating,
      status,
      creator: {
        name: user?.name,
        id: user?._id,
      },
      property: id,
    });

    // saving the review under the user
    user.reviews.push(newReview._id);
    await user.save({ session });
    // saving the PROPERTY with newly created review
    property.reviews.push(newReview._id);
    await property.save({ session });

    // end session
    await session.commitTransaction();

    res
      .status(200)
      .json({ status: "success", message: "Review added successfully" });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};
exports.updateReviewByID = async (req, res) => {
  const { id } = req.params;

  try {
    // start a new session
    const session = await mongoose.startSession();
    session.startTransaction();

    // get review
    const review = await Review.findOne({ _id: id }).session(session);
    review.status = "approved";
    await review.save({ session });

    // end session
    await session.commitTransaction();

    res.status(200).json({ status: "success", message: "Review approved " });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};
