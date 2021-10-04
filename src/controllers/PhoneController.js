const { PhoneModel } = require("../models");

class PhoneController {
    async create(req, res) {
      let { CLI_ID, PHO_NUMBER } = req.body;
      PHO_NUMBER = (PHO_NUMBER || "").toString().trim(); //toString().trim(); remove espaços em branco
      CLI_ID = (CLI_ID || "").toString().trim();
      if (PHO_NUMBER === "") {
        return res
          .status(400)
          .json({ error: ["Forneça o seu telefone para cadastro"] });
        }

    return await PhoneModel.create({CLI_ID, PHO_NUMBER })
        .then(async (r) => {
            const {CLI_ID, PHO_ID, PHO_NUMBER} = r.get();
            return res.status(200).json({CLI_ID, PHO_ID, PHO_NUMBER});
        })
    .catch((err) => {
        try {
        console.log(err);
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
module.exports = PhoneController;