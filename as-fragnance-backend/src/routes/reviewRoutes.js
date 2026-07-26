const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const reviewController = require("../controllers/reviewController");

router.get("/", reviewController.getRecentReviews);
router.get("/:perfumeId", reviewController.getReviewsByPerfume);
router.post("/", verifyToken, reviewController.addReview);

module.exports = router;
