const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
  } catch (error) {
    throw new Error("Error");
  }
};

module.exports = {
  dbConnection,
};
