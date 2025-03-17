const express = require("express");
const commentController = require("../controllers/commentController");

const router = express.Router();

// Endpoints to match commentController
router.get("/", commentController.getAllComments); // 1. Get all comments
router.get("/post/:post_id", commentController.getCommentsByPost); // 2. Get comments by post ID
router.get("/user/:user_id", commentController.getCommentsByUser); // 3. Get comments by user ID
router.post("/", commentController.addComment); // 4. Add a comment
router.put("/:id", commentController.updateComment); // 5. Update comment by ID
router.delete("/:id", commentController.deleteComment); // 6. Delete comment by ID

module.exports = router;
