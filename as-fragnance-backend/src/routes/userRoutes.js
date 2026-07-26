const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

router.get("/", verifyAdmin, userController.getUsers);
router.patch("/role", verifyAdmin, userController.updateUserRole);
router.delete("/:id", verifyAdmin, userController.deleteUser);
router.get("/role", userController.getUserRole);

module.exports = router;
