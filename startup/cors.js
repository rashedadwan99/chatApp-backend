const cors = require("cors");
module.exports = (app) => {
  app.use(cors({ origin: "https://talk-a-tive-f2ue.onrender.com", credentials: true }));
};
