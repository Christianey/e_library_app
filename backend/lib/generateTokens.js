const jwt = require("jsonwebtoken");
require('dotenv').config();

const generateAccessToken = user => {
  return jwt.sign(user, process.env.SECRET, {
    expiresIn: "15m"
  })
}

const generateRefreshToken = user => {
  return jwt.sign(user, process.env.REFRESH_SECRET)
}

module.exports.generateAccessToken = generateAccessToken;
module.exports.generateRefreshToken = generateRefreshToken;