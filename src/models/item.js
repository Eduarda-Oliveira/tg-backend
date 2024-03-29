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
        type: Sequelize.TEXT,
        allowNull: false
    },
    ITE_CONTACT: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ITE_CITY: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ITE_NEIGHBORHOOD: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ITE_ENABLED: {
        type: Sequelize.BOOLEAN,
        allowNull: false, 
        defaultValue: true
    },
});
module.exports = Item;
