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
  const __dirname1 = path.resolve();
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "/frontend/build")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
    });
  } else {
    app.get("/", (req, res) => {
      res.send("API is Running Successfully");
    });
  }
};
