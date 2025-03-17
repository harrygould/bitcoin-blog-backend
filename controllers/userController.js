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
    const updated = await User.update(req.body, {
      where: { userId: req.params.id },
    });
    updated[0]
      ? res.json({ message: "User updated" })
      : res.status(404).json({ message: "User not found" });
  } catch (error) {
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
