const Like = require("../models/likeModel");
const User = require("../models/userModel");
const Post = require("../models/postModel");

// 1. Get All Likes (GET /api/likes)
exports.getAllLikes = async (req, res) => {
  try {
    const likes = await Like.findAll({ include: [User, Post] });
    res.json({ result: 200, data: likes });
  } catch (error) {
    console.error("Error fetching likes:", error);
    res.status(500).json({ result: 500, error: error.message });
  }
};

// 2. Get Likes by Post ID (GET /api/likes/post/:post_id)
exports.getLikesByPost = async (req, res) => {
  try {
    const { post_id } = req.params;
    const likes = await Like.findAll({
      where: { post_id },
      include: [{ model: User, attributes: ["name", "email"] }],
    });

    res.json({ result: 200, data: likes });
  } catch (error) {
    console.error("Error fetching likes for post:", error);
    res.status(500).json({ result: 500, error: error.message });
  }
};

// 3. Get Likes by User ID (GET /api/likes/user/:user_id)
exports.getLikesByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const likes = await Like.findAll({
      where: { user_id },
      include: [{ model: Post, attributes: ["title", "description"] }],
    });

    res.json({ result: 200, data: likes });
  } catch (error) {
    console.error("Error fetching likes by user:", error);
    res.status(500).json({ result: 500, error: error.message });
  }
};

// 4. Create a Like (POST /api/likes)
exports.addLike = async (req, res) => {
  try {
    const { user_id, post_id } = req.body;
    const newLike = await Like.create({ user_id, post_id });

    res.json({
      result: 200,
      message: "Like added successfully",
      data: newLike,
    });
  } catch (error) {
    console.error("Error adding like:", error);
    res.status(500).json({ result: 500, error: error.message });
  }
};

// 5. Delete a Like (DELETE /api/likes/:id)
exports.deleteLike = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Like.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ message: "Like not found" });

    res.json({ result: 200, message: "Like removed successfully" });
  } catch (error) {
    console.error("Error deleting like:", error);
    res.status(500).json({ result: 500, error: error.message });
  }
};
