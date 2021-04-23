const router = require("express").Router();
const orderController = require("../controller/order.controller")
router.post("/", orderController.postOrder);
router.get('/', orderController.getOrder)
router.get("/:userid", orderController.getOrderUser);
module.exports = router;

