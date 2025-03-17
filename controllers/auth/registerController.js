const bcrypt = require("bcryptjs");
const User = require("../../models/userModel");
require("dotenv").config();

// 1. Register a new user
exports.register = async (req, res) => {
  try {
    const { userName, emailAddress, password } = req.body;

    // a. Check if user already exists
    const existingUser = await User.findOne({ where: { emailAddress } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // b. Security measure: Salt & Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // c. Create new user
    const user = await User.create({
      userName,
      emailAddress,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", userId: user.userId });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: error.message });
  }
};
