const Sequelize = require("sequelize");
const database = require("../db");
const Phone = database.define(
    "phone", {
    PHO_ID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    PHO_NUMBER: {
    type: Sequelize.STRING,
    allowNull: false
  },

});
module.exports = Phone;
