"use strict";
//manual throw table
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Carts", {
      updatedAt: { type: Sequelize.DATE },
      createdAt: { type: Sequelize.DATE },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
      total: { type: Sequelize.INTEGER, allowNull: false },

      orderId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      productId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Carts");
  },
};
