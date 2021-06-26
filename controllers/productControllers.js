const { product } = require("../db/models");

exports.productList = async (req, res) => {
  try {
    const products = await product.findAll({
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.productCreate = async (req, res) => {
  try {
    const newProduct = await product.create(req.body); //i want to create req.body
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.productDelete = async (req, res) => {
  const productId = req.params.productId; /* const {productId} =req.params;*/
  try {
    const foundProduct = await product.findByPk(productId); //i want to create req.body
    if (foundProduct) {
      await foundProduct.destroy(); //it will destroy the row(object)
      res.status(204).end;
    } else {
      res.status(404).json({ message: "product doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.productUpdate = async (req, res) => {
  const productId = req.params.productId; /* const {productId} =req.params;*/
  try {
    const foundProduct = await product.findByPk(productId); //i want to create req.body
    if (foundProduct) {
      await foundProduct.update(req.body); //it will destroy the row(object)
      res.status(204).end;
    } else {
      res.status(404).json({ message: "product doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
