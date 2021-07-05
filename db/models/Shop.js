const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define("Shop", {
    name: { type: DataTypes.STRING, allowNull: false },

    image: { type: DataTypes.STRING, allowNull: false },

    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  SequelizeSlugify.slugifyModel(Shop, {
    source: ["name"],
  });
  Shop.associate = (models) => {
    models.User.hasMany(Shop, {
      foreignKey: "userId",
      allowNull: false,
      as: "shops",
    });

    Shop.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };
  return Shop;
};
