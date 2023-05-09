const User = require("../models/User");
const Property = require("../models/Property");
const mongoose = require("mongoose");

const cloudinary = require("cloudinary").v2;

// CLOUDINARY CONFIG FILE
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.getAllProperties = async (req, res) => {
  try {
    const allProperties = await Property.find({});

    res.status(200).json({
      status: "success",
      message: "all property get  successfully",
      data: allProperties,
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};
exports.getPropertyDetail = async (req, res) => {};

exports.createProperty = async (req, res) => {
  const { title, description, propertyType, location, price, photo, email } =
    req.body;
  console.log("hi");
  try {
    // start a new session
    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email }).session(session);
    if (!user) throw new Error("User not found");

    // uploading property image to cloudinary
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newProperty = await Property.create({
      title,
      description,
      propertyType,
      location,
      price,
      photo: photoUrl.url,
      creator: {
        name: user.name,
        id: user._id,
      },
    });

    // saving the user with newly created property
    user.allProperties.push(newProperty._id);
    await user.save({ session });

    // end session
    await session.commitTransaction();

    res
      .status(200)
      .json({ status: "success", message: "Property created successfully" });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};
exports.updateProperty = async (req, res) => {};
exports.deleteProperty = async (req, res) => {};
