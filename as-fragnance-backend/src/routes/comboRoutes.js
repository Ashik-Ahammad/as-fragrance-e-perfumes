const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middlewares/authMiddleware");
const comboController = require("../controllers/comboController");

router.get("/", comboController.getCombos);
router.get("/:id", comboController.getComboById);
router.post("/", verifyAdmin, comboController.addCombo);
router.patch("/:id", verifyAdmin, comboController.updateCombo);
router.delete("/:id", verifyAdmin, comboController.deleteCombo);

module.exports = router;
