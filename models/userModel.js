const { DataTypes } = require("sequelize");
const sequelize = require("../lib/dbConnect");

const User = sequelize.define(
  "User",
  {
    userId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userName: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(20), allowNull: false },
    firstName: { type: DataTypes.STRING(15), allowNull: false },
    lastName: { type: DataTypes.STRING(20), allowNull: false },
    emailAddress: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    phoneNumber: { type: DataTypes.STRING(12), allowNull: true },
    profilePicture: { type: DataTypes.STRING(500), allowNull: true },
  },
  { timestamps: false }
);

module.exports = User;
