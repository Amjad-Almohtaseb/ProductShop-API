module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define("product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 50,
      validate: {
        min: 10,
      },
    },
    image: {
      type: DataTypes.STRING,
    },
    discription: {
      type: DataTypes.STRING,
    },
  });
  return product;
};
