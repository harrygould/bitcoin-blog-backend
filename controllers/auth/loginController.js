const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models/userModel");
require("dotenv").config();

// 1. Login a user & generate JSON Web Token token
exports.login = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;

    // a. Check if user exists by matching to database
    const user = await User.findOne({ where: { emailAddress } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // b. Compare hashed password with what is saved for that user
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // c. Generate JWT token
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: error.message });
  }
};

// JWT features:
// Stateless authentication - no need for server-side session storage
// Secure - Cryptographic signing
// Compact - Short & UEL-safe token format
// Cross platform - works with web, mobile & API's
