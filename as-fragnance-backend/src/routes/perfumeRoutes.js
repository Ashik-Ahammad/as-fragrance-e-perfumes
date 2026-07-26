const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middlewares/authMiddleware");
const perfumeController = require("../controllers/perfumeController");

router.get("/", perfumeController.getPerfumes);
router.get("/:id", perfumeController.getPerfumeById);
router.post("/", verifyAdmin, perfumeController.addPerfume);
router.patch("/:id", verifyAdmin, perfumeController.updatePerfume);
router.delete("/:id", verifyAdmin, perfumeController.deletePerfume);

module.exports = router;
