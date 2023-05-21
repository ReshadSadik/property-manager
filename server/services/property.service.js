const Property = require("../models/Property");

exports.getAllPropertyService = async (filters, queries) => {
  const allProperties = await Property.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const total = await Property.countDocuments(filters);
  const page = Math.ceil(total / queries.limit);
  return { total, page, allProperties };
};
exports.createPropertyService = async (propertyDetails) => {
  const response = await Property.create(propertyDetails);
  return response;
};
exports.getPropertyDetailsService = async (id) => {
  const response = await Property.find({ _id: id })
    .populate("creator.id")
    .populate({
      path: "creator.id",
      select: "-password -reviews -status",
    })
    .populate({
      path: "reviews",
      match: { status: "approved" },
      populate: {
        path: "creator.id",
        select: "name avatar",
      },
    })
    .exec();
  return response;
};
exports.deletePropertyByIdService = async (id) => {
  const response = await Property.deleteOne({ _id: id });
  return response;
};
exports.updatePropertyByIdService = async (id, updatedProperty) => {
  const response = await Property.updateOne({ _id: id }, updatedProperty);
  return response;
};
