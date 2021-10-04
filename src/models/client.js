const Sequelize = require("sequelize");
const database = require("../db");
const bcrypt = require("bcrypt");
const Client = database.define(
    "client", {
  // attributes
  CLI_ID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    CLI_NAME: {
        type: Sequelize.STRING,
        allowNull: false
    },
    CLI_EMAIL: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    CLI_CPF: {
      type: Sequelize.STRING,
        allowNull: false
    },
    CLI_PASSWORD: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: function (CLI_PASSWORD, next) {
              if (CLI_PASSWORD.length < 6)
                return next("A senha deve ter pelo menos 6 caracteres");
              return next();
            },
          },
    },
}, 
{
    freezeTableName: true,
    hooks: {
      beforeCreate: (client) => {
        client.CLI_PASSWORD = bcrypt.hashSync(
          client.CLI_PASSWORD,
          bcrypt.genSaltSync(10)
        );
      },
      // bug que criptografa sempre a senha
      beforeUpdate: (client, option) => {
        // beforeUpdate é chamado sempre ao atualizar, então é preciso saber se é para atualizar a password

        if (client.changed('CLI_PASSWORD'))
          client.CLI_PASSWORD = bcrypt.hashSync(
            client.CLI_PASSWORD,
            bcrypt.genSaltSync(10)
          );
      },
    },
  }
);

Client.prototype.comparePassword = (CLI_PASSWORD, hash) => {
  return bcrypt.compareSync(CLI_PASSWORD, hash);
};

module.exports = Client;