const {
  productList,
  productCreate,
  productDelete,
  productUpdate,
  productFetch,
} = require("../controllers/productControllers");
const express = require("express");
const router = express.Router();
router.param("productId", async (req, res, next, productId) => {
  const product = await productFetch(productId, next);

  if (product) {
    req.product = product;
    next();
  } else {
    next({ message: "product Not Found", status: 404 });
  }
});
//Mini Express App

router.get("/", productList);
//router.post("/", productCreate);
router.delete("/:productId", productDelete);
router.put("/:productId", productUpdate);

module.exports = router;
