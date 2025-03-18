require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "mysql",
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
  },
};
