const { CategoryModel } = require("../models");

class CategoryController {
    async create(req, res) {
      let {CAT_NAME} = req.body;
      if (CAT_NAME === "") {
        return res
          .status(400)
          .json({ error: ["Forneça a categoria para cadastro"] });
      }

    return await CategoryModel.create({CAT_NAME })
        .then(async (r) => {
            const {CAT_ID, CAT_NAME} = r.get();
            console.log(CAT_ID, CAT_NAME);
            return res.status(200).json({CAT_ID, CAT_NAME});
        })
        .catch((err) => {
            try {
            return res.status(400).json({
                error: err.errors.map((category) => category.message),
                type: "validation",
            });
            } catch (e) {
            return res.status(400).json({ error: [e.message] });
            }
        });
    }

    async list(req, res) {
      
        let { limit, offset } = req.body;
        return await CategoryModel.findAndCountAll({
          attributes: [ "CAT_ID", "CAT_NAME"],
          order: [["CAT_NAME", "ASC"]],
          offset,
          limit,
        })
        .then((category) => {
          return res.status(200).json({
            categories: category.rows.map((category) => category.get()),
            count: category.count,
          });
        })
        .catch((e) => {
          return res.status(400).json({ error: [e.message] });
        });
      }
}
module.exports = CategoryController;