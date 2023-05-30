const cors = require("cors");
module.exports = (app) => {
  app.use(cors({ origin: process.env.CLIENT_SIDE, credentials: true }));
};
