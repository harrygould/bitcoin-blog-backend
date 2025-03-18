const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Create user is in auth/routes file
router.get("/", userController.getAllUsers); // 1. Get all Users
router.get("/:id", userController.getUser); // 2. Get user by ID
router.put("/:id", userController.updateUser); // 3. Update user by ID
router.delete("/:id", userController.deleteUser); // 4. Delete user by ID

module.exports = router;
