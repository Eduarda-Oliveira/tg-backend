const { AddressModel } = require("../models");

class AddressController {
    async create(req, res) {
      let {CLI_ID, ADD_CITY, ADD_NUMBER, ADD_STREET, ADD_COMPLEMENT} = req.body;
      ADD_NUMBER = (ADD_NUMBER || "").toString().trim(); //toString().trim(); remove espaços em branco
      CLI_ID = (CLI_ID || "").toString().trim();
      if (ADD_CITY === "") {
        return res
          .status(400)
          .json({ error: ["Forneça a sua cidade para cadastro"] });
      }
      if (ADD_NUMBER === "") {
        return res
          .status(400)
          .json({ error: ["Forneça o número para cadastro"] });
      }
      if (ADD_STREET === "") {
          return res
            .status(400)
            .json({ error: ["Forneça sua rua para cadastro"] });
        }
        if (ADD_COMPLEMENT === "") {
          return res
            .status(400)
            .json({ error: ["Forneça o seu cpf para cadastro"] });
        }
    return await AddressModel.create({CLI_ID, ADD_CITY, ADD_NUMBER, ADD_STREET, ADD_COMPLEMENT })
        .then(async (r) => {
            const {CLI_ID, ADD_ID, ADD_CITY, ADD_NUMBER, ADD_STREET, ADD_COMPLEMENT} = r.get();
            return res.status(200).json({CLI_ID, ADD_ID, ADD_CITY, ADD_NUMBER, ADD_STREET, ADD_COMPLEMENT});
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
module.exports = AddressController;