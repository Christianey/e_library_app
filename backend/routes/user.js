const router = require("express").Router();
const { genPassword, validatePassword } = require("../lib/passwordUtils");
const User = require("../models/user");
require("dotenv").config();
const debug = require("debug")(process.env.DEBUG);
const jwt = require("jsonwebtoken");
const { verifyJWT } = require("../lib/verifyJWT");

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

      return res.json({ auth: true, token, user: { id, username, faculty, department, level } });
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

    debug(user);

    const newUser = await user.save()

    res.json(newUser)
  } catch (error) {
    next(error)
  }
}

async function getUserBooks(req, res, next) {

}

module.exports = router;
