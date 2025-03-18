const User = require("../models/userModel");

// 1. Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Get a single user by ID
exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    user ? res.json(user) : res.status(404).json({ message: "User not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    // Check if the user exists first
    const user = await User.findOne({ where: { userId: req.params.id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Proceed to update the user
    await User.update(req.body, { where: { userId: req.params.id } });

    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: error.message });
  }
};

// 5. Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { userId: req.params.id } });
    deleted
      ? res.json({ message: "User deleted" })
      : res.status(404).json({ message: "User not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
