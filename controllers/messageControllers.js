const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const sendMessages = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  if (!content && !chatId) {
    res.status(400);
    throw new Error("Invalid data passed into request");
  }
  const newMessage = {
    sender: req.user._id,
    content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
    res.send(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "pic name email")
      .populate("chat");
    res.send(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
module.exports = {
  sendMessages,
  allMessages,
};
