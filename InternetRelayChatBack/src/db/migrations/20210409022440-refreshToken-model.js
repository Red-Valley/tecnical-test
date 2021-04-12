"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "refreshToken",
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          refreshToken: {
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
    return queryInterface.dropTable("refreshToken");
  },
};
