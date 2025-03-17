const express = require("express");
const likeController = require("../controllers/likeController");

const router = express.Router();

router.get("/", likeController.getAllLikes); // 1. Get all likes
router.get("/post/:post_id", likeController.getLikesByPost); // 2. Get likes by post ID
router.get("/user/:user_id", likeController.getLikesByUser); // 3. Get likes by user ID
router.post("/", likeController.addLike); // 4. Add a like
router.delete("/:id", likeController.deleteLike); // 5. Delete like by ID

module.exports = router;
