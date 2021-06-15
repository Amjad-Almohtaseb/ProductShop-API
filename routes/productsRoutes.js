const {
  productList,
  productCreate,
  productDelete,
} = require("../controllers/productControllers");
const express = require("express");

//Mini Express App
const router = express.Router();
router.get("/", productList);
router.post("/", productCreate);
router.delete("/:productId", productDelete);
module.exports = router;
