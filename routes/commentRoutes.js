const express = require("express");
const commentController = require("../controllers/commentController");

const router = express.Router();

// Endpoints to match commentController
router.get("/", commentController.getAllComments); // 1. Get all comments
router.get("/post/:postId", commentController.getCommentsByPost); // 2. Get comments by post ID
router.get("/user/:userId", commentController.getCommentsByUser); // 3. Get comments by user ID
router.post("/", commentController.addComment); // 4. Add a comment
router.put("/:commentId", commentController.updateComment); // 5. Update comment by ID
router.delete("/:commentId", commentController.deleteComment); // 6. Delete comment by ID

module.exports = router;
