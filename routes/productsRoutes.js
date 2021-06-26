const {
  productList,
  productCreate,
  productDelete,
  productUpdate,
} = require("../controllers/productControllers");
const express = require("express");

//Mini Express App
const router = express.Router();
router.get("/", productList);
router.post("/", productCreate);
router.delete("/:productId", productDelete);
router.put("/:productId", productUpdate);

module.exports = router;
