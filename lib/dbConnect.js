const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: (msg) => {
      if (process.env.SEQUELIZE_LOGGING === "true") {
        console.log(msg);
      } else if (
        process.env.SEQUELIZE_LOGGING === "errors" &&
        msg.includes("ERROR")
      ) {
        console.error("Sequelize Error:", msg);
      }
    },
  }
);

sequelize
  .sync()
  .then(() => console.log("Connected to MySQL via Sequelize"))
  .catch((err) => console.error("Database connection failed:", err));

module.exports = sequelize;
