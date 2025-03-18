const { DataTypes } = require("sequelize");
const sequelize = require("../lib/dbConnect");
const User = require("./userModel");
const Post = require("./postModel");

const Comment = sequelize.define(
  "Comment",
  {
    commentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "userId" },
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Post, key: "postId" },
    },
    comment: { type: DataTypes.TEXT, allowNull: false },
    dateTimeCommented: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { timestamps: false }
);

User.hasMany(Comment, { foreignKey: "userId", onDelete: "CASCADE" });
Post.hasMany(Comment, { foreignKey: "postId", onDelete: "CASCADE" });
Comment.belongsTo(User, { foreignKey: "userId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

module.exports = Comment;
