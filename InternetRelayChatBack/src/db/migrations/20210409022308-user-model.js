"use strict";
require("uuidv4");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "user",
        {
          id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDv4,
          },
          fullName: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          nickname: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          created_at: {
            type: "TIMESTAMP",
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false,
          },
          updated_at: {
            type: "TIMESTAMP",
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false,
          },
        },
        { transaction }
      );
    });
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable("player");
  },
};
