const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    rating: { type: Number, required: true },
    status: {
      type: String,
      enum: {
        values: ["approved", "rejected"],
        message: "status cant be `{VALUE}`",
        default: "rejected",
      },
    },
    creator: {
      name: String,
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
