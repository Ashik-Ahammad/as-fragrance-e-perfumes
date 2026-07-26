const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middlewares/authMiddleware");
const couponController = require("../controllers/couponController");

router.get("/", verifyAdmin, couponController.getCoupons);
router.post("/", verifyAdmin, couponController.addCoupon);
router.post("/verify", couponController.verifyCoupon);
router.delete("/:id", verifyAdmin, couponController.deleteCoupon);

module.exports = router;
