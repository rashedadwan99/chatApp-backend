const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const auth = asyncHandler(async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(401);
    throw new Error("access denied. No token provided.");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
});

module.exports = auth;
