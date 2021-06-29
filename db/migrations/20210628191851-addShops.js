"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Shops", {
      name: { type: Sequelize.STRING, allowNull: false },

      image: { type: Sequelize.STRING, allowNull: false },

      slug: {
        type: Sequelize.STRING,
        unique: true,
      },
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      updatedAt: { type: Sequelize.DATE },
      createdAt: { type: Sequelize.DATE },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Shops");
  },
};
