const mongoose = require("mongoose");
const { DB_URL, DB_NAME, MONGO_ADMINDB } = require("../../config");

module.exports = () => {
  mongoose.connect(`${DB_URL}`, {
    dbName: DB_NAME,
    authSource: MONGO_ADMINDB,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return mongoose.connection;
};
