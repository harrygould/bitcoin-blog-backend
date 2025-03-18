const Like = require("../models/likeModel");
const User = require("../models/userModel");
const Post = require("../models/postModel");

// 1. Get All Likes (GET /api/likes)
exports.getAllLikes = async (req, res) => {
  try {
    const likes = await Like.findAll({
      include: [
        { model: User, attributes: ["userName", "emailAddress"] }, // Include User details
        { model: Post, attributes: ["postId", "title"] }, // Include Post details
      ],
    });
    res.json({ result: 200, data: likes });
  } catch (error) {
    console.error("Error fetching likes:", error);
    res.status(500).json({ result: 500, error: error.message });
  }
};

// 2. Get Likes by Post ID (GET /api/likes/post/:postId)
exports.getLikesByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const likes = await Like.findAll({
      where: { postId },
      include: [
        { model: User, attributes: ["userName", "emailAddress"] },
        { model: Post, attributes: ["title"] },
      ],
    });
    res.json({ result: 200, data: likes });
  } catch (error) {
    console.error("Error fetching likes for post:", error);
    res.status(500).json({ result: 500, error: error.message });
  }
};

// 3. Get Likes by User ID (GET /api/likes/user/:userId)
exports.getLikesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const likes = await Like.findAll({
      where: { userId },
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
    const { userId, postId } = req.body;

    // Check if the like already exists
    const existingLike = await Like.findOne({ where: { userId, postId } });

    if (existingLike) {
      return res.status(400).json({
        result: 400,
        message: "User has already liked this post",
      });
    }

    const newLike = await Like.create({ userId, postId });

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
    const { likeId } = req.params;
    const deleted = await Like.destroy({ where: { likeId } });

    if (!deleted) return res.status(404).json({ message: "Like not found" });

    res.json({ result: 200, message: "Like removed successfully" });
  } catch (error) {
    console.error("Error deleting like:", error);
    res.status(500).json({ result: 500, error: error.message });
  }
};
