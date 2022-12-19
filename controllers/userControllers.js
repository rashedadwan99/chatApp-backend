const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, picture } = req.body;
  if (!email || !password || !name) {
    res.status(400);
    throw new Error("please fill all feilds");
  }

  const isUserExists = await User.findOne({ email });
  if (isUserExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await new User({
    name,
    email,
    password,
    picture,
  });

  if (user) {
    res.status(200).send({
      _id: user._id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      token: user.generateAuthToken(),
    });
    user.save();
    return;
  } else {
    res.status(400);
    throw new Error("failed to create the user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchedPasswords(password))) {
    res.status(200).send({
      _id: user._id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      token: user.generateAuthToken(),
    });
  } else {
    res.status(400);
    throw new Error("incorrect email or password");
  }
});

// /api/user?search=
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $and: [
          {
            $or: [
              {
                name: { $regex: req.query.search, $options: "i" },
              },
              { email: { $regex: req.query.search, $options: "i" } },
            ],
          },
          { _id: { $ne: req.user._id } },
        ],
      }
    : {};

  const users = await await User.find(keyword);
  res.send(users);
});

module.exports = {
  registerUser,
  authUser,
  allUsers,
};
