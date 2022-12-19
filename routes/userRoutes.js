const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const auth = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").post(registerUser).get(auth, allUsers);
router.post("/login", authUser);

module.exports = router;
