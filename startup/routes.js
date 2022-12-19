const express = require("express");
const path = require("path");
const userRoutes = require("../routes/userRoutes");
const chatRoutes = require("../routes/chatRoutes");
const messageRoutes = require("../routes/messageRoutes");
module.exports = (app) => {
  app.use(express.json());
  app.use("/api/user", userRoutes);
  app.use("/api/chat", chatRoutes);
  app.use("/api/message", messageRoutes);
 
  
};
