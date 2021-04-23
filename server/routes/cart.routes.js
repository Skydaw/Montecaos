const router = require("express").Router();
const cartController = require("../controller/cart.controller")
router.post("/", cartController.addItemToCart);
router.get("/:userid", cartController.getCart);
router.delete("/empty-cart/:userid", cartController.emptyCart);
module.exports = router;
 