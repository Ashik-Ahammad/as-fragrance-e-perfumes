const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middlewares/authMiddleware");
const bannerController = require("../controllers/bannerController");

router.get("/", bannerController.getBanners);
router.post("/", verifyAdmin, bannerController.addBanner);
router.patch("/:id", verifyAdmin, bannerController.updateBanner);
router.delete("/:id", verifyAdmin, bannerController.deleteBanner);

module.exports = router;
