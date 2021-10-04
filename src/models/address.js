const Sequelize = require("sequelize");
const database = require("../db");
const Address = database.define(
  "address", {
  // attributes
    ADD_ID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    ADD_CITY: {
        type: Sequelize.STRING,
        allowNull: false
      },
    ADD_NUMBER: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
    ADD_STREET: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ADD_COMPLEMENT: {
        type: Sequelize.STRING,
    },
});
module.exports = Address;
