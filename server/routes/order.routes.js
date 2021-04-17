const router = require("express").Router();
const orderController = require("../controller/order.controller")
router.post("/", orderController.postOrder);
router.get("/:userid", orderController.getOrder);
module.exports = router;
 