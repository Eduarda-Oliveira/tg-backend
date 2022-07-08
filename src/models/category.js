const Sequelize = require("sequelize");
const database = require("../db");

const Category = database.define(
    "category", {
  // attributes
    CAT_ID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    CAT_NAME: {
        type: Sequelize.STRING,
        allowNull: false
      },
});
module.exports = Category;
