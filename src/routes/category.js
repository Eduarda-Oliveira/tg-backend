const router = require("express").Router();
const {CategoryController} = require("../controllers");
const {create} = new CategoryController();

// curl -X POST -d  http://localhost:9001/category/create
router.post("/create", create);

router.use( (req, res) => {
    res.status(400).json({error:['Operação desconhecida com o usuário']});
})

module.exports = router;