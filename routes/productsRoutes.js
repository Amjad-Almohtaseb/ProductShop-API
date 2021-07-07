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
const { fetchShop } = require("../controllers/shopControllers");

router.param("productId", async (req, res, next, productId) => {
  const product = await productFetch(productId, next);

  if (product) {
    //to delete or update a product and i want to check if he is the owner
    //i need the shop and user ,the user is easy to fetch because i will take it from (passport auth)
    //but in this case i dont have the shop but i have the product and inside it i have the shop id
    //and from the shop id i can bring the product and from the product i can git the user id.
    const shop = await fetchShop(product.shopId, next);
    //put inside the req a new keys(attributes) called shop and product and give them objects.and now
    //both of update and delete have access on shop and product object.
    req.shop = shop;
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
