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

// 2. Get Comments by Post ID (GET /api/comments/post/:postId)
exports.getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.findAll({
      where: { postId },
      include: [
        { model: User, attributes: ["userName", "emailAddress"] },
        { model: Post, attributes: ["title"] },
      ],
    });

    res.json({ result: 200, data: comments });
  } catch (error) {
    console.error("Error fetching comments for post:", error);
    res.status(500).json({ result: 500, error: error.message });
  }
};

// 3. Get Comments by User ID (GET /api/comments/user/:userId)
exports.getCommentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const comments = await Comment.findAll({
      where: { userId },
      include: [{ model: Post, attributes: ["title", "description"] }],
    });

    res.json({ result: 200, data: comments });
  } catch (error) {
    console.error("Error fetching comments by user:", error);
    res.status(500).json({ result: 500, error: error.message });
  }
};

// 4. Add a Comment (POST /api/comments)
exports.addComment = async (req, res) => {
  try {
    const { userId, postId, comment } = req.body;
    const newComment = await Comment.create({ userId, postId, comment });

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

// 5. Update a Comment (PUT /api/comments/:commentId)
exports.updateComment = async (req, res) => {
  try {
    const { commentId } = req.params; // Extract `commentId` from URL
    const { comment } = req.body; // Extract updated comment text

    // Check if the comment exists
    const existingComment = await Comment.findByPk(commentId);
    if (!existingComment) {
      return res.status(404).json({
        result: 404,
        message: "Comment not found",
      });
    }

    // Update the comment
    await Comment.update({ comment }, { where: { commentId } });

    res.json({
      result: 200,
      message: "Comment updated successfully",
    });
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ result: 500, error: error.message });
  }
};

// 6. Delete a Comment (DELETE /api/comments/:id)
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const deleted = await Comment.destroy({ where: { commentId } });

    if (!deleted) return res.status(404).json({ message: "Comment not found" });

    res.json({ result: 200, message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ result: 500, error: error.message });
  }
};
