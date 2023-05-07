const dotenv = require("dotenv").config();
const colors = require("colors");
const app = require("./app");
const connectDB = require("./utils/connectDB");

const port = process.env.PORT || 8080;
// server
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);

    app.listen(port, () =>
      console.log("Server started on port http://localhost:8080".yellow.bold)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
