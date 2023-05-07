const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/user.route.js");
const propertyRouter = require("./routes/user.route.js");

//middlewares
app.use(cors());
app.use(express.json({ limit: "50mb" }));

//routes
app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/properties", propertyRouter);

module.exports = app;
