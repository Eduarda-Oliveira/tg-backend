const router = require("express").Router();
const {ItemController} = require("../controllers");
const {create, list, update, listCategory, getId} = new ItemController();

// curl -X POST -d "mail=teste@teste.com&senha=123456" http://localhost:9001/item/create
router.post("/create", create);

router.get("/list", list);

router.put("/update", update);

router.get("/id", getId);

router.get("/listCategory", listCategory);

router.use( (req, res) => {
    res.status(400).json({error:['Operação desconhecida']});
})

module.exports = router;