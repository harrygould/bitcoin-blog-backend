const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/likes", require("./routes/likeRoutes"));

const PORT = process.env.PORT || 7080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
