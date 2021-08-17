const express = require("express");
const connection = require("./config/database");
const helmet = require("helmet");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const bookRouter = require("./routes/book");
const userRouter = require("./routes/user");
const { errorController } = require("./lib/errorController");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

if (app.get("env") == "development") {
  const morgan = require("morgan");
  app.use(morgan("tiny"));
}

require("dotenv").config();
const debug = require("debug")(process.env.DEBUG);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connection.then(() => debug("Database Connected!"));

app.use(bookRouter);
app.use(userRouter);
app.use(function (error, req, res) {
  if (error) res.status(404).json({ message: `Na 404 cause am: ${err}` });
});
app.use(errorController);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  debug(`App is listening on port ${PORT}`);
});
