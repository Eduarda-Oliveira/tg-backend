const router = require("express").Router();
const {ItemController} = require("../controllers");
const {create} = new ItemController();

// curl -X POST -d "mail=teste@teste.com&senha=123456" http://localhost:3100/api/item/create
router.post("/create", create);

router.use( (req, res) => {
    res.status(400).json({error:['Operação desconhecida']});
})

module.exports = router;