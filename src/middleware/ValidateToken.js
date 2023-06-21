const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authorization = req.headers.Authorization || req.headers.authorization;
  if (!authorization) {
    res.status(400);
    throw new Error("Authorization token required");
  }

  if (authorization && authorization.startsWith("Bearer")) {

    token = authorization.split(" ")[1];

    const { _id } = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = await User.findOne({ _id }).select("_id");
    // console.log("validate token user: ",req.user._id)
    
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
      if (err) {
        res.status(400);
        throw new Error("User is not authorized");
      }
      // console.log(decoded)
      // req.user=decoded
      next();
    });
  }
});

module.exports = validateToken;
