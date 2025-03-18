const Post = require("../models/postModel");

// 1. Create a new post ()
exports.createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Get a single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.postId);
    post ? res.json(post) : res.status(404).json({ message: "Post not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Get all posts by User ID
exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.findAll({ where: { userId } });

    posts.length > 0 // check if posts exist for that user
      ? res.json({ result: 200, data: posts })
      : res.status(404).json({ message: "No posts found for this user" });
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({ error: error.message });
  }
};

// 5. Update a post
exports.updatePost = async (req, res) => {
  try {
    const updated = await Post.update(req.body, {
      where: { postId: req.params.id },
    });
    updated[0]
      ? res.json({ message: "Post updated" })
      : res.status(404).json({ message: "Post not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 6. Delete a post
exports.deletePost = async (req, res) => {
  try {
    const deleted = await Post.destroy({ where: { postId: req.params.id } });
    deleted
      ? res.json({ message: "Post deleted" })
      : res.status(404).json({ message: "Post not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
