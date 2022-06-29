const { ClientModel } = require("../models");
const { Token } = require("../../utils");
const { generateToken } = Token;

class ClientController {
  async create(req, res) {
    let { CLI_EMAIL, CLI_PASSWORD, CLI_NAME, CLI_CPF } = req.body;
    CLI_EMAIL = (CLI_EMAIL || "").toString().trim(); //toString().trim(); remove espaços em branco
    CLI_PASSWORD = (CLI_PASSWORD || "").toString().trim();
    CLI_CPF = (CLI_CPF || "").toString().trim();
    if (CLI_EMAIL === "") {
      return res
        .status(400)
        .json({ error: ["Forneça o seu e-mail para cadastro"] });
    }
    if (CLI_NAME === "") {
        return res
          .status(400)
          .json({ error: ["Forneça o nome para cadastro"] });
      }
      if (CLI_CPF === "") {
        return res
          .status(400)
          .json({ error: ["Forneça o seu cpf para cadastro"] });
      }
    if (CLI_PASSWORD === "") {
      return res.status(400).json({ error: ["Forneça a senha para cadastro"] });
    }
    if (CLI_PASSWORD.length < 6) {
      return res
        .status(400)
        .json({ error: ["A senha deve ter entre 6 pelo menos caracteres"] });
    }

    return await ClientModel.create({CLI_NAME, CLI_EMAIL, CLI_CPF, CLI_PASSWORD })
      .then(async (r) => {
        const { CLI_ID, CLI_NAME, CLI_EMAIL, CLI_CPF, CLI_PASSWORD } = r.get();
        return res.status(200).json({CLI_ID, CLI_NAME, CLI_EMAIL, CLI_CPF, CLI_PASSWORD });
      })
      .catch((err) => {
        try {
          return res.status(400).json({
            error: err.errors.map((client) => client.message),
            type: "validation",
          });
        } catch (e) {
          return res.status(400).json({ error: [e.message] });
        }
      });
  }

  async login(req, res) {
    let { CLI_EMAIL, CLI_PASSWORD } = req.body;
    CLI_EMAIL = (CLI_EMAIL || "").toString().trim();
    CLI_PASSWORD = (CLI_PASSWORD || "").toString().trim();
    if (CLI_EMAIL === "") {
      return res
        .status(400)
        .json({ error: ["Forneça o e-mail do seu cadastro"] });
    }
    if (CLI_PASSWORD === "") {
      return res
        .status(400)
        .json({ error: ["Forneça a sua senha de cadastro"] });
    }

    return await ClientModel.findOne({
      where: { CLI_EMAIL },
    })
      .then(async (client) => {
        if (client) {
          if (client.comparePassword(CLI_PASSWORD, client.CLI_PASSWORD)) {
            const token = await generateToken({
              CLI_ID: client.CLI_ID,
              CLI_EMAIL: client.CLI_EMAIL,

            });

            return res.json({
              token,
              CLI_ID: client.CLI_ID,
              CLI_EMAIL: client.CLI_EMAIL,
            });
              
          } else
            return res
              .status(400)
              .json({ error: ["Dados de login não conferem"] });
        } else
          return res.status(400).json({ error: ["Usuário não identificado"] });
      })
      .catch((e) => {
        return res.status(400).json({ error: [e.message] });
      });
  }
    async logout(req, res) {
      res.json({ auth: false, token: null });
    }
    async listclient(req, res) {
      
    let { limit, offset } = req.body;
    return await ItemModel.findAndCountAll({
      attributes: ["CLI_EMAIL", "CLI_PASSWORD", "CLI_NAME", "CLI_CPF"],
      order: [["CLI_EMAIL", "ASC"]],
      offset,
      limit,
    })
    .then((client) => {
      return res.status(200).json({
        clients: client.rows.map((client) => client.get()),
        count: client.count,
      });
    })
    .catch((e) => {
      return res.status(400).json({ error: [e.message] });
    });
  }
}

module.exports = ClientController;