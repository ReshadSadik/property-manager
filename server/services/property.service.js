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
