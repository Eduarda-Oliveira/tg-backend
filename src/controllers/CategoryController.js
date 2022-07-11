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
                error: err.errors.map((item) => item.message),
                type: "validation",
            });
            } catch (e) {
            return res.status(400).json({ error: [e.message] });
            }
        });
    }
}
module.exports = CategoryController;