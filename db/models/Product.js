const SequelizeSlugify = require("sequelize-slugify");
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },

    price: { type: DataTypes.INTEGER, defaultValue: 5, validate: { min: 5 } },
    image: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  SequelizeSlugify.slugifyModel(Product, {
    source: ["name"],
  });
  Product.associate = (models) => {
    models.Shop.hasMany(Product, {
      foreignKey: "shopId",
      allowNull: false,
      as: "products",
    });

    Product.belongsTo(models.Shop, {
      foreignKey: "shopId",
    });
  };

  return Product;
};
