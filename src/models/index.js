  const PhoneModel = require("./phone");
  const AddressModel = require("./address");
  const ClientModel = require("./client");
  const ItemModel = require("./item");
  const CategoryModel = require("./category");

  
  //importa o arquivo database/index.js
  const database = require("../db");
  
  ClientModel.hasMany(PhoneModel, {
    foreignKey: {
      name: "CLI_ID",
      allowNull: false,
    },
    sourceKey: "CLI_ID",
    onDelete: "cascade",
    onUpdate: "cascade",
    hooks: true, //usado para forçar o cascade no onDelete
  });
  PhoneModel.belongsTo(ClientModel, {
    foreignKey: "CLI_ID"
  });

  ClientModel.hasMany(AddressModel, {
    foreignKey: {
      name: "CLI_ID",
      allowNull: false,
    },
    sourceKey: "CLI_ID",
    onDelete: "cascade",
    onUpdate: "cascade",
    hooks: true, //usado para forçar o cascade no onDelete
  });
  AddressModel.belongsTo(ClientModel, {
    foreignKey: "CLI_ID"
  });
   
  ClientModel.hasMany(ItemModel, {
    foreignKey: {
      name: "CLI_ID",
      allowNull: false,
    },
    sourceKey: "CLI_ID",
    onDelete: "cascade",
    onUpdate: "cascade",
    hooks: true, //usado para forçar o cascade no onDelete
  });
  ItemModel.belongsTo(ClientModel, {
    foreignKey: "CLI_ID"
  });
  CategoryModel.hasOne(ItemModel, {
    foreignKey: {
      name: "CAT_ID",
      allowNull: false,
    },
    sourceKey: "CAT_ID",
    onDelete: "cascade",
    onUpdate: "cascade",
    hooks: true, //usado para forçar o cascade no onDelete
  });
  ItemModel.belongsTo(CategoryModel, {
    foreignKey: "CAT_ID"
  });

  //cria as tabelas no SGBD se elas não existirem
  database.sync();
  
  module.exports = {
    PhoneModel,
    AddressModel,
    ClientModel,
    ItemModel,
    CategoryModel,
  };