const { product } = require("../db/models");
exports.productFetch = async (productId, next) => {
  try {
    const foundProduct = await product.findByPk(productId);

    return foundProduct;
  } catch (error) {
    next(error);
  }
};

exports.productList = async (req, res, next) => {
  try {
    const products = await product.findAll({
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
    });

    res.json(products);
  } catch (error) {
    next(error);
  }
};
exports.productCreate = async (req, res, next) => {
  try {
    const newProduct = await product.create(req.body); //i want to create req.body
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};
exports.productDelete = async (req, res, next) => {
  try {
    await req.product.destroy(); //it will destroy the row(object)
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
exports.productUpdate = async (req, res, next) => {
  console.log("hi");
  try {
    await req.product.update(req.body); //it will destroy the row(object)
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
