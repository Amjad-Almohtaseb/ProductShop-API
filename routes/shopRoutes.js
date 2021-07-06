const express = require("express");
const upload = require("../media/middleware/multer");
const passport = require("passport");
const router = express.Router();
const {
  shopsCreate,
  shopsDelete,
  shopsList,
  shopUpdate,
  fetchShop,
  productsCreate,
} = require("../controllers/shopControllers");

router.param("shopId", async (req, res, next, shopId) => {
  const foundShop = await fetchShop(shopId, next);

  if (foundShop) {
    req.shop = foundShop;

    next();
  } else {
    next(res.status(404).json({ message: "shop is not found" }));
  }
});

router.post(
  "/:shopId/products",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  productsCreate
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),

  upload.single("image"),
  shopsCreate
);

router.get("/", shopsList);

module.exports = router;
