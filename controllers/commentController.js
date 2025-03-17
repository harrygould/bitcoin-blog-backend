const Comment = require("../models/commentModel");
const User = require("../models/userModel");
const Post = require("../models/postModel");

// 1. Get All Comments (GET /api/comments)
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [
        { model: User, attributes: ["userId", "userName"] }, // Include User details
        { model: Post, attributes: ["postId", "title"] }, // Include Post details
      ],
    });
    res.json({ result: 200, data: comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ result: 500, error: error.message });
  }
};

// 2. Get Comments by Post ID (GET /api/comments/post/:post_id)
exports.getCommentsByPost = async (req, res) => {
  try {
    const { post_id } = req.params;
    const comments = await Comment.findAll({
      where: { post_id },
      include: [{ model: User, attributes: ["name", "email"] }],
    });

    res.json({ result: 200, data: comments });
  } catch (error) {
    console.error("Error fetching comments for post:", error);
    res.status(500).json({ result: 500, error: error.message });
  }
};

// 3. Get Comments by User ID (GET /api/comments/user/:user_id)
exports.getCommentsByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const comments = await Comment.findAll({
      where: { user_id },
      include: [{ model: Post, attributes: ["title", "description"] }],
    });

    res.json({ result: 200, data: comments });
  } catch (error) {
    console.error("Error fetching comments by user:", error);
    res.status(500).json({ result: 500, error: error.message });
  }
};

// 4. Create a Comment (POST /api/comments)
exports.addComment = async (req, res) => {
  try {
    const { user_id, post_id, text } = req.body;
    const newComment = await Comment.create({ user_id, post_id, text });

    res.json({
      result: 200,
      message: "Comment added successfully",
      data: newComment,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ result: 500, error: error.message });
  }
};

// 5. Update a Comment (PUT /api/comments/:id)
exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Comment.update(req.body, {
      where: { id },
      returning: true,
    });

    if (!updated) return res.status(404).json({ message: "Comment not found" });

    const updatedComment = await Comment.findByPk(id);
    res.json({
      result: 200,
      message: "Comment updated successfully",
      data: updatedComment,
    });
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ result: 500, error: error.message });
  }
};

// 6. Delete a Comment (DELETE /api/comments/:id)
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Comment.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ message: "Comment not found" });

    res.json({ result: 200, message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ result: 500, error: error.message });
  }
};
