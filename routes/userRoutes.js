const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/", userController.createUser); // 1. Create User
router.get("/", userController.getAllUsers); // 2. Get all Users
router.get("/:id", userController.getUser); // 3. Get user by ID
router.put("/:id", userController.updateUser); // 4. Update user by ID
router.delete("/:id", userController.deleteUser); // 5. Delete user by ID

module.exports = router;
