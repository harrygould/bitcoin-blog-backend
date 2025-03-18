const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.post("/", postController.createPost); // 1. Create a post
router.get("/", postController.getAllPosts); // 2. Get all posts
router.get("/:id", postController.getPostById); // 3. Get post by ID
router.get("/user/:userId", postController.getUserPosts); // 4. Get posts by user ID
router.put("/:id", postController.updatePost); // 5. Update post by ID
router.delete("/:id", postController.deletePost); // 6. Delete post by ID

module.exports = router;
