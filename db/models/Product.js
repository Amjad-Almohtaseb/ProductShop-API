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

  return Product;
};
