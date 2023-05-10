const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  propertyType: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  photo: { type: String, required: true },
  creator: {
    name: String,
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
});

const Property = mongoose.model("Property", PropertySchema);

module.exports = Property;
