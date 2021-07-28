const { Order, Cart } = require("../db/models");

exports.checkout = async (req, res, next) => {
  try {
    const newOrder = await Order.create({ customerId: req.user.id });
    const cart = req.body.map((item) => ({ ...item, orderId: newOrder.id }));
    await Cart.bulkCreate(cart);

    const finalOrder = {
      ...newOrder.toJSON,
      orderId: newOrder.id,
      products: req.body,
    };

    //console.log(finalOrder);

    res.status(201).json(finalOrder);
  } catch (error) {
    next(error);
  }
};
