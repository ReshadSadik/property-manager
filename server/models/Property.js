const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please provide a name for the property"],
  },
  description: {
    type: String,
    required: [true, "please provide a description for the property"],
  },
  propertyType: {
    type: String,
    required: [true, "please select a type for the property"],
  },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  photo: { type: String, required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  creator: {
    name: String,
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
});
// test comment
const Property = mongoose.model("Property", PropertySchema);

module.exports = Property;
