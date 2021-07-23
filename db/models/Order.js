module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {});

  Order.associate = (models) => {
    models.User.hasMany(Order, {
      foreignKey: "customerId",
      allowNull: false,
      as: "orders",
    });

    Order.belongsTo(models.User, {
      foreignKey: "customerId",
    });
  };

  return Order;
};
