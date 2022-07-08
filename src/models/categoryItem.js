const Sequelize = require("sequelize");
const database = require("../db");
const ItemModel = require("./item");
const Category = require("./category");

const CatergoryItem = database.define(
    "catergoryItem", {
  // attributes
    CAI_ID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
});
module.exports = CatergoryItem;
