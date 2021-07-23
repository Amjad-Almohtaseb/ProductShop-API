module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("Cart", {
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    total: { type: DataTypes.INTEGER, allowNull: false },
  });

  Cart.associate = (models) => {
    models.Product.belongsToMany(models.Order, {
      through: Cart,
      foreignKey: "productId",
    });

    models.Order.belongsToMany(models.Product, {
      through: Cart,
      foreignKey: "orderId",
    });
  };

  return Cart;
};
