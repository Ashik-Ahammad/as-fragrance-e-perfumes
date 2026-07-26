const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middlewares/authMiddleware");
const orderController = require("../controllers/orderController");

router.post("/", orderController.createOrder);
router.get("/", verifyToken, orderController.getOrders);
router.post("/sync", verifyToken, orderController.syncGuestOrders);
router.patch("/:id/status", verifyAdmin, orderController.updateOrderStatus);
router.patch("/:id/payment", verifyAdmin, orderController.updatePaymentStatus);
router.delete("/:id", verifyAdmin, orderController.deleteOrder);

module.exports = router;
