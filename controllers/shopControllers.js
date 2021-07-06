const { Shop, Product } = require("../db/models");

exports.fetchShop = async (shopId, next) => {
  try {
    const foundShop = await Shop.findByPk(shopId);
    return foundShop;
  } catch (error) {
    next(error);
  }
};

exports.shopsList = async (req, res, next) => {
  try {
    const shops = await Shop.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },

      include: [
        {
          model: Product,
          attributes: ["id"],
          as: "products",
        },
      ],
    });
    res.json(shops);
  } catch (error) {
    next(error);
  }
};

exports.shopsCreate = async (req, res, next) => {
  try {
    req.body.userId = req.user.id;
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }

    const newShop = await Shop.create(req.body);
    res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
};

exports.productsCreate = async (req, res, next) => {
  try {
    //i put if statment because if there is no img req.file.filename will be undifined
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.shopId = req.shop.id;

    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};
