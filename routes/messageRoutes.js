const express = require("express");
const {
  sendMessages,
  allMessages,
} = require("../controllers/messageControllers");
const auth = require("../middlewares/authMiddleware");
const router = express.Router();
router.route("/").post(auth, sendMessages);
router.route("/:chatId").get(auth, allMessages);
module.exports = router;
