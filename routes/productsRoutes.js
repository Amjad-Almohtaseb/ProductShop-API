const {
  productList,
  productCreate,
  productDelete,
  productUpdate,
  productFetch,
} = require("../controllers/productControllers");
const express = require("express");
const passport = require("passport");
const router = express.Router();
const upload = require("../media/middleware/multer");

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
router.delete(
  "/:productId",
  passport.authenticate("jwt", { session: false }),
  productDelete
);
//when some one make a put req he wiil go here and then will go to upload in multer.js that will call storage and then it
//will put the image inside media folder.
router.put(
  "/:productId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  productUpdate
); //image is the name of the field in the model

module.exports = router;
