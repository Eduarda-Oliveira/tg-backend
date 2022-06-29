const { ItemModel } = require("../models");

class ItemController {
  async create(req, res) {
    let {CLI_ID, ITE_TITLE, ITE_PRICE, ITE_DESCRIPTION, ITE_IMAGE, ITE_CONTACT, ITE_CATEGORY, ITE_ENABLED, ITE_SIDE, ITE_WEIGHT_CAPECITY, ITE_WEIGHT, ITE_MATERIAL} = req.body;
    ITE_PRICE = (ITE_PRICE || "").toString().trim(); //toString().trim(); remove espaços em branco
    ITE_CONTACT = (ITE_CONTACT || "").toString().trim();
    CLI_ID = (CLI_ID || "").toString().trim();
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
    if (ITE_CATEGORY === "") {
        return res.status(400).json({ error: ["Forneça uam categoria para cadastro do produto"] });
      }
    if (ITE_CONTACT === "") {
        return res.status(400).json({ error: ["Forneça um contato para cadastro do produto"] });
    }

    return await ItemModel.create({CLI_ID, ITE_TITLE, ITE_PRICE, ITE_DESCRIPTION, ITE_IMAGE, ITE_CATEGORY, ITE_CONTACT, ITE_ENABLED, ITE_SIDE, ITE_WEIGHT_CAPECITY, ITE_WEIGHT, ITE_MATERIAL})
      .then(async (r) => {
        const {CLI_ID, ITE_ID, ITE_TITLE, ITE_PRICE, ITE_DESCRIPTION, ITE_IMAGE, ITE_CATEGORY, ITE_CONTACT, ITE_ENABLED, ITE_SIDE, ITE_WEIGHT_CAPECITY, ITE_WEIGHT, ITE_MATERIAL} = r.get();
        return res.status(200).json({CLI_ID, ITE_ID, ITE_TITLE, ITE_PRICE, ITE_DESCRIPTION, ITE_IMAGE, ITE_CATEGORY, ITE_CONTACT, ITE_ENABLED, ITE_SIDE, ITE_WEIGHT_CAPECITY, ITE_WEIGHT, ITE_MATERIAL});
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
    // const token = await getToken(req);
    // if (!token || !token.CLI_ID) {
    //   return res.status(401).json({ error: ["Efetue o login para continuar"] });
    // }
    
    let {ITE_ENABLED} = req.body;
    ITE_ENABLED = (ITE_ENABLED || "").toString().trim();
    
    if (ITE_ENABLED === "") {
      return res.status(400).json({ error: ["Forneça o novo status do anuncio"] });
    }
    
    return await ItemModel.findOne({ where: { ITE_ENABLED } })
    .then(async (item) => {
      if (item.ITE_ENABLED == ITE_ENABLED){
        return res.status(400).json({
          error: ["status do anuncio é igual ao cadastrado"]
        })
      }

      if (item) {
        await item.update({ ITE_ENABLED });
        return res.status(200).json({
          item,
        });
      }
      return res.status(400).json({ error: ["Produto não encontrada"] });
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
        attributes: ["ITE_ID", "ITE_TITLE", "ITE_PRICE", "ITE_DESCRIPTION", "ITE_IMAGE", "ITE_CATEGORY", "ITE_CONTACT", "ITE_ENABLED"],
        order: [["ITE_TITLE", "ASC"]],
        offset,
        limit,
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
}

module.exports = ItemController;