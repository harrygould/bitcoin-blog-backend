const { DataTypes } = require("sequelize");
const sequelize = require("../lib/dbConnect");
const User = require("./userModel");
const Post = require("./postModel");

const Like = sequelize.define(
  "Like",
  {
    likeId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
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
    dateTimeLiked: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { timestamps: false }
);

User.hasMany(Like, { foreignKey: "userId", onDelete: "CASCADE" });
Post.hasMany(Like, { foreignKey: "postId", onDelete: "CASCADE" });
Like.belongsTo(User, { foreignKey: "userId" });
Like.belongsTo(Post, { foreignKey: "postId" });

module.exports = Like;
