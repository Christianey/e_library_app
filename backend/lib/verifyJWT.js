const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
  const authToken = req.headers["x-access-token"];
  
  if (!authToken) {
      console.log(authToken)
      res.status(401).json({message: "You are not authorized to access this resource."});
    } else {
      const token = authToken.split(" ")[1];
      
      jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error) {
          res
            .status(401)
            .json({ auth: false, message: "You failed to authenticate" });
        }

        req.user = decoded;
        next();
      });
    }
}

module.exports.verifyJWT = verifyJWT;
