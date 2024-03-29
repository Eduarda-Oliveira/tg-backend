const { ItemModel } = require("../models");

class ItemController {
  async create(req, res) {
    let {CLI_ID, CAT_ID, ITE_TITLE, ITE_PRICE, ITE_DESCRIPTION, ITE_IMAGE, ITE_CONTACT, ITE_ENABLED, ITE_CITY, ITE_NEIGHBORHOOD} = req.body;
    ITE_PRICE = (ITE_PRICE || "").toString().trim(); //toString().trim(); remove espaços em branco
    ITE_CONTACT = (ITE_CONTACT || "").toString().trim();
    CLI_ID = (CLI_ID || "").toString().trim();
    CAT_ID = (CAT_ID || "").toString().trim();

    if (ITE_TITLE === "") {
      return res
        .status(400)
        .json({ error: ["Forneça o tírulo para cadastro do produto"] });
    }
    if (ITE_PRICE === "") {
        return res
          .status(400)
          .json({ error: ["Forneça o proço para cadastro do produto"] });
      }
      if (ITE_DESCRIPTION === "") {
        return res
          .status(400)
          .json({ error: ["Forneça uma descrição para cadastro do produto"] });
      }
    if (ITE_IMAGE === "") {
      return res.status(400).json({ error: ["Forneça uma imagem para cadastro do produto"] });
    }
    if (ITE_CONTACT === "") {
        return res.status(400).json({ error: ["Forneça um contato para cadastro do produto"] });
    }

    return await ItemModel.create({CLI_ID, CAT_ID, ITE_TITLE, ITE_PRICE, ITE_DESCRIPTION, ITE_IMAGE, ITE_CONTACT, ITE_CITY, ITE_NEIGHBORHOOD, ITE_ENABLED})
      .then(async (r) => {
        const {CLI_ID, CAT_ID, ITE_ID, ITE_TITLE, ITE_PRICE, ITE_DESCRIPTION, ITE_IMAGE,  ITE_CONTACT, ITE_ENABLED} = r.get();
        return res.status(200).json({CLI_ID, CAT_ID, ITE_ID, ITE_TITLE, ITE_PRICE, ITE_DESCRIPTION, ITE_IMAGE,  ITE_CONTACT, ITE_ENABLED});
      })
      .catch((err) => {
        console.log(err);
        try {
          return res.status(400).json({
            error: err.errors.map((item) => item.message),
            type: "validation",
          });
        } catch (e) {
          return res.status(400).json({ error: [e.message] });
        }
      });
  }

  async update(req,res){
    
    let {ITE_TITLE, ITE_PRICE, ITE_DESCRIPTION, ITE_ENABLED, ITE_ID} = req.body;
    
    return await ItemModel.findOne({ where: { ITE_ID } })
    .then(async (item) => {
        await item.update({ ITE_TITLE, ITE_PRICE, ITE_DESCRIPTION, ITE_ENABLED });
        return res.status(200).json({
          item,
      })
    })
    .catch((err) => {
      console.log(err);
      try {
        return res.status(400).json({
            error: err.errors.map((item) => item.message),
            type: "validation",
          });
        } catch (e) {
          return res.status(400).json({ error: [e.message] });
        }
      });
    }

    async list(req, res) {
      
      let { limit, offset } = req.body;
      return await ItemModel.findAndCountAll({
        attributes: ["ITE_ID", "CAT_ID", "ITE_TITLE", "ITE_PRICE", "ITE_DESCRIPTION", "ITE_IMAGE", "ITE_CONTACT", "ITE_CITY", "ITE_NEIGHBORHOOD", "ITE_ENABLED"],
        order: [["ITE_TITLE", "ASC"]],
        offset,
        limit,
        where: { 
          ITE_ENABLED: true
        },
      })
      .then((item) => {
        return res.status(200).json({
          items: item.rows.map((item) => item.get()),
          count: item.count,
        });
      })
      .catch((e) => {
        return res.status(400).json({ error: [e.message] });
      });
    }


    async listCategory(req, res) {
      
      let { CAT_ID } = req.query;
      return await ItemModel.findAll({
        where: { 
          CAT_ID: CAT_ID,
          ITE_ENABLED: true
        },
        attributes: ["ITE_ID", "CAT_ID", "ITE_TITLE", "ITE_PRICE", "ITE_DESCRIPTION", "ITE_IMAGE", "ITE_CONTACT", "ITE_ENABLED", "ITE_CITY", "ITE_NEIGHBORHOOD"],
        order: [["ITE_TITLE", "ASC"]],
      })
      .then((item) => {
        console.log(item)
        return res.status(200).json({
          items: item.map((item) => item.get()),
        });
      })
      .catch((e) => {
        return res.status(400).json({ error: [e.message] });
      });
    }
    async getId(req,res){

      let {ITE_ID} = req.query;
      return await ItemModel.findOne({ where: { ITE_ID} })
        .then((item) => {
          return res.status(200).json({
            item,
          })
        })
      .catch((e) => {
        return res.status(400).json({ error: [e.message] });
      });
    }
    
    async getUserId(req,res){
      let {CLI_ID} = req.query;
      return await ItemModel.findOne({ where: { CLI_ID  } })
        .then((item) => {
          return res.status(200).json({
            item,
          })
        })
      .catch((e) => {
        return res.status(400).json({ error: [e.message] });
      });
    }
  }
module.exports = ItemController;