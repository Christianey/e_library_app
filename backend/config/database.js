const mongoose = require("mongoose");
require("dotenv").config();

const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const connection = mongoose
  .connect(process.env.MONGO_URI, options)
  .then((connection) => (connection.connection));

module.exports = connection;
