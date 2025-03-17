const express = require("express");
const registerController = require("../controllers/auth/registerController");
const loginController = require("../controllers/auth/loginController");

const router = express.Router();

router.post("/register", registerController.register); // Register Post Request
router.post("/login", loginController.login); // Login Post request

module.exports = router;
