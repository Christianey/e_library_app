const router = require("express").Router();
const { genPassword, validatePassword } = require("../lib/passwordUtils");
const User = require("../models/user");
require("dotenv").config();
const debug = require("debug")(process.env.DEBUG);
const jwt = require("jsonwebtoken");

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

async function loginUser(req, res, next) {
  try {
    const { username: reqUsername, password } = req.body;

    const user = await User.findOne({ username: reqUsername });

    if (!user) throw new Error("Invalid Username");

    const { hash, salt, _id: id, username, faculty, department, level } = user;

    const isValid = validatePassword(password, hash, salt);

    if (isValid) {
      const token = jwt.sign({ id, username }, process.env.SECRET, {
        expiresIn: "5d",
      });

      return res.json({
        auth: true,
        token,
        user: { id, username, faculty, department, level },
      });
    } else {
      throw new Error("Invalid Password");
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

async function registerUser(req, res, next) {
  try {
    const { username, displayName, faculty, department, level, password } =
      req.body;

    const userExists = await User.find({ username });
    if (userExists)
      return res
        .status(400)
        .json({ message: "Username already exists, please try another one" });

    const { hash, salt } = genPassword(password);

    const user = new User({
      username,
      displayName,
      faculty,
      department,
      level,
      hash,
      salt,
    });

    const newUser = await user.save();

    const token = jwt.sign(
      { id: newUser._id, username: newUser._doc.username },
      process.env.SECRET,
      {
        expiresIn: "5d",
      }
    );
    res.json({
      auth: true,
      token,
      user: { ...newUser._doc, salt: null, hash: null },
    });
  } catch (error) {
    next(error);
  }
}

// async function getUserBooks(req, res, next) {

// }

module.exports = router;
