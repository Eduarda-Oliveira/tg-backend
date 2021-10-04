const { ItemModel } = require("../models");

class ItemController {
  async create(req, res) {
    let {CLI_ID, ITE_TITLE, ITE_PRICE, ITE_DESCRIPTION, ITE_IMAGE, ITE_TAGS, ITE_CONTACT, ITE_ENABLED} = req.body;
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
    if (ITE_TAGS === "") {
        return res.status(400).json({ error: ["Forneça tags para cadastro do produto"] });
      }
    if (ITE_CONTACT === "") {
        return res.status(400).json({ error: ["Forneça um contato para cadastro do produto"] });
    }

    return await ItemModel.create({CLI_ID, ITE_TITLE, ITE_PRICE, ITE_DESCRIPTION, ITE_IMAGE, ITE_TAGS, ITE_CONTACT, ITE_ENABLED})
      .then(async (r) => {
        const {CLI_ID, ITE_ID, ITE_TITLE, ITE_PRICE, ITE_DESCRIPTION, ITE_IMAGE, ITE_TAGS, ITE_CONTACT, ITE_ENABLED} = r.get();
        return res.status(200).json({CLI_ID, ITE_ID, ITE_TITLE, ITE_PRICE, ITE_DESCRIPTION, ITE_IMAGE, ITE_TAGS, ITE_CONTACT, ITE_ENABLED});
      })
      .catch((err) => {
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
}

module.exports = ItemController;