const { Product } = require("../db/models");
exports.productFetch = async (productId, next) => {
  try {
    const foundProduct = await Product.findByPk(productId);

    return foundProduct;
  } catch (error) {
    next(error);
  }
};

exports.productList = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
    });

    res.json(products);
  } catch (error) {
    next(error);
  }
};
// exports.productCreate = async (req, res, next) => {
//   try {
//     const newProduct = await Product.create(req.body); //i want to create req.body
//     res.status(201).json(newProduct);
//   } catch (error) {
//     next(error);
//   }
// };
exports.productDelete = async (req, res, next) => {
  try {
    if (req.shop.userId !== req.user.id) {
      throw {
        status: 401,
        message: "you can't delete a book that's not yours",
      };
    }
    await req.product.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
exports.productUpdate = async (req, res, next) => {
  try {
    if (req.shop.userId !== req.user.id) {
      throw {
        status: 401,
        message: "you can't update a book that's not yours",
      };
    }
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.product.update(req.body);
    res.json(req.product);
  } catch (error) {
    next(error);
  }
};
