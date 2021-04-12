"use strict";
const { uuid } = require("uuidv4");

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkInsert(
        "user",
        [
          {
            id: uuid(),
            fullName: "Jose Hernandez",
            nickname: "JCATMAN",
            email: "jose.hernandez@ingrapes.com",
            password: "123456*",
          },
        ],
        transaction
      );
    });
  },

  down: async (queryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkDelete("user", null, { transaction });
    });
  },
};
