const Sequelize = require("sequelize");
const database = require("../db");
const Item = database.define(
    "item", {
  // attributes
  ITE_ID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    ITE_TITLE: {
        type: Sequelize.STRING,
        allowNull: false
      },
    ITE_PRICE: {
        type: Sequelize.DECIMAL(6,2),
        allowNull: false
    },
    ITE_DESCRIPTION: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ITE_IMAGE: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ITE_CONTACT: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ITE_ENABLED: {
        type: Sequelize.BOOLEAN,
        allowNull: false, 
        defaultValue: true
    },
    ITE_SIDE:{
        type: Sequelize.STRING,
    },
    ITE_WEIGHT_CAPECITY:{
        type: Sequelize.STRING,
    },
    ITE_WEIGHT:{
        type: Sequelize.STRING,
    },
    ITE_MATERIAL:{
        type: Sequelize.STRING,
    },
});
module.exports = Item;
