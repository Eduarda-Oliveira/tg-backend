  const PhoneModel = require("./phone");
  const AddressModel = require("./address");
  const ClientModel = require("./client");
  const ItemModel = require("./item");
  const CategoryModel = require("./category");
  const CategoryItemModel = require("./categoryItem");

  
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
    foreignKey: "CLI_ID",
    targetKey: "CLI_ID",
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
    foreignKey: "CLI_ID",
    targetKey: "CLI_ID",
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
    foreignKey: "CLI_ID",
    targetKey: "CLI_ID",
  });
  CategoryItemModel.hasOne(CategoryModel, {
    foreignKey: {
      name: "CAI_ID",
      allowNull: false,
    },
    sourceKey: "CAI_ID",
    onDelete: "cascade",
    onUpdate: "cascade",
    hooks: true, //usado para forçar o cascade no onDelete
  });
  CategoryModel.create({
    foreignKey: "CAT_ID",
    targetKey: "CAT_ID",
  });
  CategoryItemModel.hasOne(ItemModel, {
    foreignKey: {
      name: "CAI_ID",
      allowNull: false,
    },
    sourceKey: "CAI_ID",
    onDelete: "cascade",
    onUpdate: "cascade",
    hooks: true, //usado para forçar o cascade no onDelete
  });

  //cria as tabelas no SGBD se elas não existirem
  database.sync();
  
  module.exports = {
    PhoneModel,
    AddressModel,
    ClientModel,
    ItemModel
  };