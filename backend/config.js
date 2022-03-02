const path = require("path");

let envFile = ".env";
if (process.env.NODE_ENV === "test") {
  envFile = ".env.test";
}

require("dotenv").config({
  path: path.resolve(__dirname, envFile)
});

module.exports = {
  AVATAR_URL: process.env.AVATAR_URL,
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  DB_NAME: process.env.DB_NAME,
  MONGO_ADMINDB: process.env.MONGO_ADMINDB,
};
