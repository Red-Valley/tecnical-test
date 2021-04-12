"use strict";
require("uuidv4");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "chatHistory",
        {
          id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
          },
          nickname: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          date: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          message: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          isImage: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
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
    return queryInterface.dropTable("chatHistory");
  },
};
