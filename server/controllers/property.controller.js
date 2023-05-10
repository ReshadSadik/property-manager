const User = require("../models/User");
const Property = require("../models/Property");
const mongoose = require("mongoose");
const {
  createPropertyService,
  getAllPropertyService,
  getPropertyDetailsService,
  deletePropertyByIdService,
} = require("../services/property.service");

const cloudinary = require("cloudinary").v2;

// CLOUDINARY CONFIG FILE
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.getAllProperties = async (req, res) => {
  try {
    //{price:{$ gt:50}
    //{ price: { gt: '50' } }
    console.log(req.query);

    let filters = { ...req.query };

    //sort , page , limit -> exclude
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    //gt ,lt ,gte .lte
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    filters = JSON.parse(filtersString);

    const queries = {};

    if (req.query.sort) {
      // price,qunatity   -> 'price quantity'
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(fields);
    }

    if (req.query.page) {
      const { page = 1, limit = 4 } = req.query; // "3" "10"
      //50 products
      // each page 10 product
      //page 1--> 1-10
      //page 2--> 2-20
      //page 3--> 21-30     --> page 3  -> skip 1-20  -> 3-1 ->2 *10
      //page 4--> 31-40      ---> page 4 --> 1-30  --> 4-1  -->3*10
      //page 5--> 41-50

      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const allProperties = await getAllPropertyService(filters, queries);

    res.status(200).json({
      status: "success",
      data: allProperties,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};
exports.getPropertyDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const propertyDetails = await getPropertyDetailsService(id);
    if (!propertyDetails) {
      // return throw error
    }
    res.status(200).json({
      status: "success",
      data: propertyDetails,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get property detail",
      error: error.message,
    });
  }
};

exports.createProperty = async (req, res) => {
  const { title, description, propertyType, location, price, photo, email } =
    req.body;

  try {
    // start a new session
    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email }).session(session);
    if (!user) throw new Error("User not found");

    // uploading property image to cloudinary
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newProperty = await createPropertyService({
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
exports.deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deletePropertyByIdService(id);
    if (response.deletedCount > 0) {
      res
        .status(200)
        .json({ status: "success", message: "Property deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};